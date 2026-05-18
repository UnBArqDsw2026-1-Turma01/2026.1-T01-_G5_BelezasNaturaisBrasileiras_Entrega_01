import { Injectable, Logger } from '@nestjs/common';
import { ITrilhaObserver } from '../interfaces/ITrilhaObserver';

@Injectable()
export class NotificacaoObserver implements ITrilhaObserver {
  private readonly logger = new Logger(NotificacaoObserver.name);

  async onTrilhaFinalizada(trilhaId: string, participanteIds: string[]): Promise<void> {
    participanteIds.forEach((participanteId) => {
      this.logger.log(
        `Notificação enviada: participante=${participanteId} — Trilha ${trilhaId} finalizada. Badge disponível no seu perfil!`,
      );
    });
  }
}
