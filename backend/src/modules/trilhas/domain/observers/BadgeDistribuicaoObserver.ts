import { Injectable, Inject, Logger } from '@nestjs/common';
import { ITrilhaObserver } from '../interfaces/ITrilhaObserver';
import { IBadgeRepository } from '../interfaces/IBadgeRepository';

@Injectable()
export class BadgeDistribuicaoObserver implements ITrilhaObserver {
  private readonly logger = new Logger(BadgeDistribuicaoObserver.name);

  constructor(
    @Inject('IBadgeRepository')
    private readonly badgeRepository: IBadgeRepository,
  ) {}

  async onTrilhaFinalizada(trilhaId: string, participanteIds: string[]): Promise<void> {
    await Promise.all(
      participanteIds.map((participanteId) =>
        this.badgeRepository.create(participanteId, trilhaId).then((badge) => {
          this.logger.log(
            `Badge salvo: participante=${participanteId} trilha=${trilhaId} conquistadoEm=${badge.conquistadoEm.toISOString()}`,
          );
        }),
      ),
    );
  }
}
