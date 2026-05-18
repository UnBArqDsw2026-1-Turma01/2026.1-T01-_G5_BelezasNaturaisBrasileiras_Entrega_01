import { TrilhaStatus } from '../enums/TrilhaStatus';

export class Trilha {
  id: string;
  titulo: string;
  descricao: string;
  organizadorId: string;
  pontoEncontro: string;
  dataInicio: Date;
  vagasMaximas: number;
  status: TrilhaStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    organizadorId: string,
    pontoEncontro: string,
    dataInicio: Date,
    vagasMaximas: number,
    status: TrilhaStatus = TrilhaStatus.ATIVA,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.organizadorId = organizadorId;
    this.pontoEncontro = pontoEncontro;
    this.dataInicio = dataInicio;
    this.vagasMaximas = vagasMaximas;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  finalizar(): void {
    if (this.status === TrilhaStatus.INATIVA) {
      throw new Error('Trilha já está finalizada');
    }
    this.status = TrilhaStatus.INATIVA;
  }

  marcarLotada(): void {
    this.status = TrilhaStatus.LOTADA;
  }
}
