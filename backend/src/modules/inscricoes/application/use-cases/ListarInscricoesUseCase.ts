import { Injectable, Inject } from '@nestjs/common';
import { IInscricaoRepository } from '../../domain/interfaces/IInscricaoRepository';
import { Inscricao } from '../../domain/entities/Inscricao';

@Injectable()
export class ListarInscricoesUseCase {
  constructor(
    @Inject('IInscricaoRepository')
    private readonly inscricaoRepository: IInscricaoRepository,
  ) {}

  async porTrilha(trilhaId: string): Promise<Inscricao[]> {
    return this.inscricaoRepository.findByTrilhaId(trilhaId);
  }

  async minhas(usuarioId: string): Promise<Inscricao[]> {
    return this.inscricaoRepository.findByUsuarioId(usuarioId);
  }
}
