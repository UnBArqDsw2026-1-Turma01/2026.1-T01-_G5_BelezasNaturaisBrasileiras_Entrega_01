import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ITrilhaRepository } from '../../domain/interfaces/ITrilhaRepository';
import { TrilhaCaretaker } from '../../domain/memento/TrilhaCaretaker';
import { Trilha } from '../../domain/entities/Trilha';

@Injectable()
export class RestaurarTrilhaUseCase {
  constructor(
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
    private readonly caretaker: TrilhaCaretaker,
  ) {}

  async execute(trilhaId: string, organizadorId: string): Promise<Trilha> {
    const trilha = await this.trilhaRepository.findById(trilhaId);
    if (!trilha) throw new NotFoundException('Trilha não encontrada');

    if (trilha.organizadorId !== organizadorId)
      throw new BadRequestException(
        'Apenas o organizador pode restaurar a trilha',
      );

    if (!this.caretaker.hasHistory(trilhaId))
      throw new BadRequestException('Nenhum estado anterior para restaurar');

    const memento = this.caretaker.restore(trilhaId)!;
    trilha.restoreState(memento);
    return this.trilhaRepository.save(trilha);
  }
}
