import { ListarTrilhasUseCase } from './ListarTrilhasUseCase';
import { Trilha } from '../../domain/entities/Trilha';
import { TrilhaStatus } from '../../domain/enums/TrilhaStatus';

const makeTrilha = (overrides: Partial<Trilha> = {}): Trilha =>
  ({
    id: '1',
    titulo: 'Trilha Teste',
    descricao: 'Descrição teste',
    organizadorId: 'org-1',
    pontoEncontro: 'Ponto A',
    dataInicio: new Date(),
    vagasMaximas: 10,
    status: TrilhaStatus.ATIVA,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }) as Trilha;

describe('ListarTrilhasUseCase', () => {
  const makeRepo = (trilhas: Trilha[]) => ({
    findAll: jest.fn().mockResolvedValue(trilhas),
  });

  it('returns all trilhas when no filter', async () => {
    const trilhas = [makeTrilha({ id: '1' }), makeTrilha({ id: '2' })];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({});
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no trilhas', async () => {
    const uc = new ListarTrilhasUseCase(makeRepo([]) as any);
    const result = await uc.execute({});
    expect(result).toHaveLength(0);
  });

  it('filters by status ATIVA', async () => {
    const trilhas = [
      makeTrilha({ id: '1', status: TrilhaStatus.ATIVA }),
      makeTrilha({ id: '2', status: TrilhaStatus.FINALIZADA }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ status: TrilhaStatus.ATIVA });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filters by status LOTADA', async () => {
    const trilhas = [
      makeTrilha({ id: '1', status: TrilhaStatus.ATIVA }),
      makeTrilha({ id: '2', status: TrilhaStatus.LOTADA }),
      makeTrilha({ id: '3', status: TrilhaStatus.INATIVA }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ status: TrilhaStatus.LOTADA });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('paginates results page 1', async () => {
    const trilhas = [
      makeTrilha({ id: '1' }),
      makeTrilha({ id: '2' }),
      makeTrilha({ id: '3' }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ page: 1, pageSize: 2 });
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('returns second page', async () => {
    const trilhas = [
      makeTrilha({ id: '1' }),
      makeTrilha({ id: '2' }),
      makeTrilha({ id: '3' }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ page: 2, pageSize: 2 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('returns empty array when page exceeds total pages', async () => {
    const trilhas = [makeTrilha({ id: '1' }), makeTrilha({ id: '2' })];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ page: 10, pageSize: 2 });
    expect(result).toHaveLength(0);
  });

  it('filters by status and paginates', async () => {
    const trilhas = [
      makeTrilha({ id: '1', status: TrilhaStatus.ATIVA }),
      makeTrilha({ id: '2', status: TrilhaStatus.ATIVA }),
      makeTrilha({ id: '3', status: TrilhaStatus.ATIVA }),
      makeTrilha({ id: '4', status: TrilhaStatus.LOTADA }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({
      status: TrilhaStatus.ATIVA,
      page: 2,
      pageSize: 2,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('ignores pagination if only page is provided', async () => {
    const trilhas = [
      makeTrilha({ id: '1' }),
      makeTrilha({ id: '2' }),
      makeTrilha({ id: '3' }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ page: 1 } as any);
    expect(result).toHaveLength(3);
  });

  it('ignores pagination if only pageSize is provided', async () => {
    const trilhas = [
      makeTrilha({ id: '1' }),
      makeTrilha({ id: '2' }),
      makeTrilha({ id: '3' }),
    ];
    const uc = new ListarTrilhasUseCase(makeRepo(trilhas) as any);
    const result = await uc.execute({ pageSize: 2 } as any);
    expect(result).toHaveLength(3);
  });
});
