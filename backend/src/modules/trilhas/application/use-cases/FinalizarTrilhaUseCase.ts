import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITrilhaRepository } from '../../domain/interfaces/ITrilhaRepository';
import { IInscricaoRepository } from '../../../inscricoes/domain/interfaces/IInscricaoRepository';
import { TrilhaEventEmitter } from '../../domain/observers/TrilhaEventEmitter';
import { TrilhaCaretaker } from '../../domain/memento/TrilhaCaretaker';

@Injectable()
export class FinalizarTrilhaUseCase {
  constructor(
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
    @Inject('IInscricaoRepository')
    private readonly inscricaoRepository: IInscricaoRepository,
    private readonly trilhaEventEmitter: TrilhaEventEmitter,
    private readonly caretaker: TrilhaCaretaker,
  ) {}

  async execute(trilhaId: string, organizadorId: string): Promise<void> {
    const trilha = await this.trilhaRepository.findById(trilhaId);
    if (!trilha) throw new NotFoundException('Trilha não encontrada');

    // Salvar estado anterior antes de finalizar (Memento pattern)
    this.caretaker.save(trilhaId, trilha.saveState());

    // Autorização verificada pelo TrilhaProxyRepository (Protection Proxy)
    trilha.finalizar();
    await this.trilhaRepository.save(trilha);

    const presentes =
      await this.inscricaoRepository.findPresentesByTrilhaId(trilhaId);
    const participanteIds = presentes.map((i) => i.usuarioId);

    await this.trilhaEventEmitter.notificarFinalizacao(
      trilhaId,
      participanteIds,
    );
  }
}
