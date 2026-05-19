import { Injectable } from '@nestjs/common';
import { TrilhaMemento } from './TrilhaMemento';

@Injectable()
export class TrilhaCaretaker {
  private readonly history = new Map<string, TrilhaMemento[]>();

  save(trilhaId: string, memento: TrilhaMemento): void {
    if (!this.history.has(trilhaId)) {
      this.history.set(trilhaId, []);
    }
    this.history.get(trilhaId)!.push(memento);
  }

  restore(trilhaId: string): TrilhaMemento | undefined {
    const mementos = this.history.get(trilhaId);
    if (!mementos || mementos.length === 0) return undefined;
    return mementos.pop();
  }

  hasHistory(trilhaId: string): boolean {
    const mementos = this.history.get(trilhaId);
    return !!mementos && mementos.length > 0;
  }
}
