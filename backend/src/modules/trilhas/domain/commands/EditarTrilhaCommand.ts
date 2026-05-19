import { Trilha } from '../entities/Trilha';
import { ICommand } from './ICommand';

export interface EditarTrilhaUpdates {
  titulo?: string;
  descricao?: string;
  pontoEncontro?: string;
  dataInicio?: Date;
  vagasMaximas?: number;
}

type TrilhaSnapshot = {
  titulo: string;
  descricao: string;
  pontoEncontro: string;
  dataInicio: Date;
  vagasMaximas: number;
};

export class EditarTrilhaCommand implements ICommand {
  private snapshot: TrilhaSnapshot | null = null;

  constructor(
    private readonly trilha: Trilha,
    private readonly updates: EditarTrilhaUpdates,
  ) {}

  execute(): void {
    this.snapshot = {
      titulo: this.trilha.titulo,
      descricao: this.trilha.descricao,
      pontoEncontro: this.trilha.pontoEncontro,
      dataInicio: this.trilha.dataInicio,
      vagasMaximas: this.trilha.vagasMaximas,
    };

    if (this.updates.titulo !== undefined)
      this.trilha.titulo = this.updates.titulo;
    if (this.updates.descricao !== undefined)
      this.trilha.descricao = this.updates.descricao;
    if (this.updates.pontoEncontro !== undefined)
      this.trilha.pontoEncontro = this.updates.pontoEncontro;
    if (this.updates.dataInicio !== undefined)
      this.trilha.dataInicio = this.updates.dataInicio;
    if (this.updates.vagasMaximas !== undefined)
      this.trilha.vagasMaximas = this.updates.vagasMaximas;

    this.trilha.updatedAt = new Date();
  }

  undo(): void {
    if (!this.snapshot) throw new Error('Nenhuma edição para desfazer');

    this.trilha.titulo = this.snapshot.titulo;
    this.trilha.descricao = this.snapshot.descricao;
    this.trilha.pontoEncontro = this.snapshot.pontoEncontro;
    this.trilha.dataInicio = this.snapshot.dataInicio;
    this.trilha.vagasMaximas = this.snapshot.vagasMaximas;
  }
}
