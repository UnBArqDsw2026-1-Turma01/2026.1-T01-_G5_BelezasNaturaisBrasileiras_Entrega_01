import { Injectable } from '@nestjs/common';
import { ITrilhaObserver } from '../interfaces/ITrilhaObserver';

@Injectable()
export class TrilhaEventEmitter {
  private readonly observers: ITrilhaObserver[] = [];

  subscribe(observer: ITrilhaObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: ITrilhaObserver): void {
    const index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  async notificarFinalizacao(trilhaId: string, participanteIds: string[]): Promise<void> {
    await Promise.all(
      this.observers.map((o) => o.onTrilhaFinalizada(trilhaId, participanteIds)),
    );
  }

  get totalObservadores(): number {
    return this.observers.length;
  }
}
