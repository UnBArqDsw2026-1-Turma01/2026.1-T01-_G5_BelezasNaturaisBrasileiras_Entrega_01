import { Inscricao } from '../entities/Inscricao';

export interface IInscricaoRepository {
  create(inscricao: Inscricao): Promise<Inscricao>;
  findById(id: string): Promise<Inscricao | null>;
  findByTrilhaId(trilhaId: string): Promise<Inscricao[]>;
  findByUsuarioId(usuarioId: string): Promise<Inscricao[]>;
  findByTrilhaAndUsuario(
    trilhaId: string,
    usuarioId: string,
  ): Promise<Inscricao | null>;
  findPresentesByTrilhaId(trilhaId: string): Promise<Inscricao[]>;
  save(inscricao: Inscricao): Promise<Inscricao>;
}
