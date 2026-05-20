import { RestaurarTrilhaUseCase } from './RestaurarTrilhaUseCase';
import { TrilhaCaretaker } from '../../domain/memento/TrilhaCaretaker';
import { TrilhaMemento } from '../../domain/memento/TrilhaMemento';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TrilhaStatus } from '../../domain/enums/TrilhaStatus';

const ORG_ID = 'org-1';
const TRILHA_ID = 'trilha-1';

const makeTrilha = (overrides = {}) => ({
  id: TRILHA_ID,
  organizadorId: ORG_ID,
  titulo: 'Chapada',
  descricao: 'Uma bela trilha',
  status: TrilhaStatus.ATIVA,
  saveState: jest.fn(),
  restoreState: jest.fn(),
  ...overrides,
});

const makeMemento = () =>
  new TrilhaMemento({
    titulo: 'Chapada Original',
    descricao: 'Descrição original',
    pontoEncontro: 'Ponto A',
    dataInicio: new Date('2024-01-01'),
    vagasMaximas: 10,
    status: TrilhaStatus.ATIVA,
  });

describe('RestaurarTrilhaUseCase', () => {
  const makeRepo = (trilha: any) => ({
    findById: jest.fn().mockResolvedValue(trilha),
    save: jest.fn().mockImplementation((t) => Promise.resolve(t)),
    create: jest.fn(),
    findAll: jest.fn(),
  });

  it('throws NotFoundException when trilha not found', async () => {
    const repo = {
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    };
    const caretaker = new TrilhaCaretaker();
    const uc = new RestaurarTrilhaUseCase(repo as any, caretaker);

    await expect(uc.execute(TRILHA_ID, ORG_ID)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws BadRequestException when not organizer', async () => {
    const repo = makeRepo(makeTrilha());
    const caretaker = new TrilhaCaretaker();
    const uc = new RestaurarTrilhaUseCase(repo as any, caretaker);

    await expect(uc.execute(TRILHA_ID, 'other-user')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws BadRequestException when no history', async () => {
    const repo = makeRepo(makeTrilha());
    const caretaker = new TrilhaCaretaker();
    const uc = new RestaurarTrilhaUseCase(repo as any, caretaker);

    await expect(uc.execute(TRILHA_ID, ORG_ID)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('restores state and saves trilha', async () => {
    const trilha = makeTrilha();
    const repo = makeRepo(trilha);
    const caretaker = new TrilhaCaretaker();
    const memento = makeMemento();
    caretaker.save(TRILHA_ID, memento);

    const uc = new RestaurarTrilhaUseCase(repo as any, caretaker);
    const result = await uc.execute(TRILHA_ID, ORG_ID);

    expect(trilha.restoreState).toHaveBeenCalledWith(memento);
    expect(repo.save).toHaveBeenCalledWith(trilha);
    expect(result).toEqual(trilha);
  });

  it('removes memento from history after restore', async () => {
    const trilha = makeTrilha();
    const repo = makeRepo(trilha);
    const caretaker = new TrilhaCaretaker();
    const memento1 = makeMemento();
    const memento2 = makeMemento();

    caretaker.save(TRILHA_ID, memento1);
    caretaker.save(TRILHA_ID, memento2);
    expect(caretaker.hasHistory(TRILHA_ID)).toBe(true);

    const uc = new RestaurarTrilhaUseCase(repo as any, caretaker);
    await uc.execute(TRILHA_ID, ORG_ID);

    // After restore, the most recent memento should be gone
    expect(caretaker.hasHistory(TRILHA_ID)).toBe(true); // memento1 still there
  });
});
