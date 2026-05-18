import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IInscricaoRepository } from '../../domain/interfaces/IInscricaoRepository';
import { ITrilhaRepository } from '../../../trilhas/domain/interfaces/ITrilhaRepository';
import { Inscricao } from '../../domain/entities/Inscricao';
import { TrilhaStatus } from '../../../trilhas/domain/enums/TrilhaStatus';

@Injectable()
export class SolicitarInscricaoUseCase {
  constructor(
    @Inject('IInscricaoRepository')
    private readonly inscricaoRepository: IInscricaoRepository,
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
  ) {}

  async execute(usuarioId: string, trilhaId: string): Promise<Inscricao> {
    const trilha = await this.trilhaRepository.findById(trilhaId);
    if (!trilha) throw new NotFoundException('Trilha não encontrada');
    if (trilha.status !== TrilhaStatus.ATIVA) {
      throw new ConflictException('Trilha não está aceitando inscrições');
    }

    const existente = await this.inscricaoRepository.findByTrilhaAndUsuario(
      trilhaId,
      usuarioId,
    );
    if (existente)
      throw new ConflictException('Você já possui uma inscrição nesta trilha');

    const inscricao = new Inscricao(randomUUID(), trilhaId, usuarioId);
    return this.inscricaoRepository.create(inscricao);
  }
}
