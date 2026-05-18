import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IInscricaoRepository } from '../../domain/interfaces/IInscricaoRepository';
import { ITrilhaRepository } from '../../../trilhas/domain/interfaces/ITrilhaRepository';
import { Inscricao } from '../../domain/entities/Inscricao';

@Injectable()
export class RejeitarInscricaoUseCase {
  constructor(
    @Inject('IInscricaoRepository')
    private readonly inscricaoRepository: IInscricaoRepository,
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
  ) {}

  async execute(
    inscricaoId: string,
    organizadorId: string,
  ): Promise<Inscricao> {
    const inscricao = await this.inscricaoRepository.findById(inscricaoId);
    if (!inscricao) throw new NotFoundException('Inscrição não encontrada');

    const trilha = await this.trilhaRepository.findById(inscricao.trilhaId);
    if (!trilha) throw new NotFoundException('Trilha não encontrada');
    if (trilha.organizadorId !== organizadorId) {
      throw new ForbiddenException(
        'Apenas o organizador pode rejeitar inscrições',
      );
    }

    inscricao.rejeitar();
    return this.inscricaoRepository.save(inscricao);
  }
}
