import { Trilha } from '../entities/Trilha';
import { TrilhaStatus } from '../enums/TrilhaStatus';
import { EditarTrilhaCommand } from './EditarTrilhaCommand';
import { TrilhaCommandHistory } from './TrilhaCommandHistory';

const makeTrilha = (): Trilha =>
  new Trilha(
    'trilha-1',
    'Trilha Original',
    'Descrição original',
    'org-1',
    'Ponto A',
    new Date('2026-06-01'),
    20,
    TrilhaStatus.ATIVA,
  );

describe('EditarTrilhaCommand', () => {
  it('should apply updates to trilha on execute', () => {
    const trilha = makeTrilha();
    const cmd = new EditarTrilhaCommand(trilha, {
      titulo: 'Trilha Editada',
      descricao: 'Nova descrição',
    });

    cmd.execute();

    expect(trilha.titulo).toBe('Trilha Editada');
    expect(trilha.descricao).toBe('Nova descrição');
    expect(trilha.pontoEncontro).toBe('Ponto A');
  });

  it('should restore original values on undo', () => {
    const trilha = makeTrilha();
    const cmd = new EditarTrilhaCommand(trilha, { titulo: 'Trilha Editada' });

    cmd.execute();
    cmd.undo();

    expect(trilha.titulo).toBe('Trilha Original');
    expect(trilha.descricao).toBe('Descrição original');
  });

  it('should throw on undo if execute was never called', () => {
    const trilha = makeTrilha();
    const cmd = new EditarTrilhaCommand(trilha, { titulo: 'X' });

    expect(() => cmd.undo()).toThrow('Nenhuma edição para desfazer');
  });

  it('should not update fields that are not in updates', () => {
    const trilha = makeTrilha();
    const cmd = new EditarTrilhaCommand(trilha, { titulo: 'Novo Título' });

    cmd.execute();

    expect(trilha.pontoEncontro).toBe('Ponto A');
    expect(trilha.vagasMaximas).toBe(20);
  });
});

describe('TrilhaCommandHistory', () => {
  it('should execute a command and add to history', () => {
    const trilha = makeTrilha();
    const history = new TrilhaCommandHistory();
    const cmd = new EditarTrilhaCommand(trilha, { titulo: 'Editado' });

    history.execute(cmd);

    expect(trilha.titulo).toBe('Editado');
    expect(history.canUndo()).toBe(true);
  });

  it('should undo the last executed command', () => {
    const trilha = makeTrilha();
    const history = new TrilhaCommandHistory();
    history.execute(new EditarTrilhaCommand(trilha, { titulo: 'Editado' }));

    history.undoLast();

    expect(trilha.titulo).toBe('Trilha Original');
    expect(history.canUndo()).toBe(false);
  });

  it('should throw when undoLast called with empty history', () => {
    const history = new TrilhaCommandHistory();
    expect(() => history.undoLast()).toThrow('Histórico de comandos vazio');
  });

  it('should support multiple undos in LIFO order', () => {
    const trilha = makeTrilha();
    const history = new TrilhaCommandHistory();

    history.execute(
      new EditarTrilhaCommand(trilha, { titulo: 'Primeira edição' }),
    );
    history.execute(
      new EditarTrilhaCommand(trilha, { titulo: 'Segunda edição' }),
    );

    history.undoLast();
    expect(trilha.titulo).toBe('Primeira edição');

    history.undoLast();
    expect(trilha.titulo).toBe('Trilha Original');
  });
});
