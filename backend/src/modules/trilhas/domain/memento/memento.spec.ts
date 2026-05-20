import { TrilhaMemento, TrilhaMementoState } from './TrilhaMemento';
import { TrilhaCaretaker } from './TrilhaCaretaker';
import { TrilhaStatus } from '../enums/TrilhaStatus';

const makeState = (
  overrides: Partial<TrilhaMementoState> = {},
): TrilhaMementoState => ({
  titulo: 'Chapada',
  descricao: 'Bela trilha',
  pontoEncontro: 'Entrada',
  dataInicio: new Date('2026-01-01'),
  vagasMaximas: 10,
  status: TrilhaStatus.ATIVA,
  ...overrides,
});

describe('TrilhaMemento', () => {
  it('stores state immutably', () => {
    const state = makeState();
    const memento = new TrilhaMemento(state);
    state.titulo = 'Alterado';
    expect(memento.getState().titulo).toBe('Chapada');
  });

  it('getState returns a copy', () => {
    const memento = new TrilhaMemento(makeState());
    const s1 = memento.getState();
    s1.titulo = 'Alterado';
    expect(memento.getState().titulo).toBe('Chapada');
  });
});

describe('TrilhaCaretaker', () => {
  it('saves and restores a memento', () => {
    const caretaker = new TrilhaCaretaker();
    const memento = new TrilhaMemento(makeState());
    caretaker.save('id-1', memento);
    const restored = caretaker.restore('id-1');
    expect(restored).toBe(memento);
  });

  it('hasHistory returns false when empty', () => {
    const caretaker = new TrilhaCaretaker();
    expect(caretaker.hasHistory('id-1')).toBe(false);
  });

  it('hasHistory returns true after save', () => {
    const caretaker = new TrilhaCaretaker();
    caretaker.save('id-1', new TrilhaMemento(makeState()));
    expect(caretaker.hasHistory('id-1')).toBe(true);
  });

  it('restore returns undefined when empty', () => {
    const caretaker = new TrilhaCaretaker();
    expect(caretaker.restore('id-1')).toBeUndefined();
  });

  it('restore LIFO — last saved is first restored', () => {
    const caretaker = new TrilhaCaretaker();
    const m1 = new TrilhaMemento(makeState({ titulo: 'Primeiro' }));
    const m2 = new TrilhaMemento(makeState({ titulo: 'Segundo' }));
    caretaker.save('id-1', m1);
    caretaker.save('id-1', m2);
    expect(caretaker.restore('id-1')!.getState().titulo).toBe('Segundo');
    expect(caretaker.restore('id-1')!.getState().titulo).toBe('Primeiro');
  });
});
