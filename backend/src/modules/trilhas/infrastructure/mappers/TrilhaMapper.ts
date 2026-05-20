import { Trilha } from '../../domain/entities/Trilha';
import { TrilhaStatus } from '../../domain/enums/TrilhaStatus';

type TrilhaRaw = {
  id: string;
  titulo: string;
  descricao: string;
  organizadorId: string;
  pontoEncontro: string;
  dataInicio: Date;
  vagasMaximas: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export class TrilhaMapper {
  static toDomain(raw: TrilhaRaw): Trilha {
    return new Trilha(
      raw.id,
      raw.titulo,
      raw.descricao,
      raw.organizadorId,
      raw.pontoEncontro,
      raw.dataInicio,
      raw.vagasMaximas,
      raw.status as TrilhaStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(trilha: Trilha): TrilhaRaw {
    return {
      id: trilha.id,
      titulo: trilha.titulo,
      descricao: trilha.descricao,
      organizadorId: trilha.organizadorId,
      pontoEncontro: trilha.pontoEncontro,
      dataInicio: trilha.dataInicio,
      vagasMaximas: trilha.vagasMaximas,
      status: trilha.status,
      createdAt: trilha.createdAt,
      updatedAt: trilha.updatedAt,
    };
  }
}
