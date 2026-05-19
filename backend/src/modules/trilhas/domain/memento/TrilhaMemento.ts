import { TrilhaStatus } from '../enums/TrilhaStatus';

export interface TrilhaMementoState {
  titulo: string;
  descricao: string;
  pontoEncontro: string;
  dataInicio: Date;
  vagasMaximas: number;
  status: TrilhaStatus;
}

export class TrilhaMemento {
  private readonly state: TrilhaMementoState;

  constructor(state: TrilhaMementoState) {
    this.state = { ...state };
  }

  getState(): TrilhaMementoState {
    return { ...this.state };
  }
}
