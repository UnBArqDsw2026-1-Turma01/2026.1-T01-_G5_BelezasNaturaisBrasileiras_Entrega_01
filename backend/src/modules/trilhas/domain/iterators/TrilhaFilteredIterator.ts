import { Trilha } from '../entities/Trilha';
import { TrilhaStatus } from '../enums/TrilhaStatus';
import { ITrilhaIterator } from './ITrilhaIterator';

export class TrilhaFilteredIterator implements ITrilhaIterator {
  private index = 0;
  private readonly items: Trilha[];

  constructor(trilhas: Trilha[], filter?: TrilhaStatus) {
    this.items = filter
      ? trilhas.filter((t) => t.status === filter)
      : [...trilhas];
  }

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  next(): Trilha {
    return this.items[this.index++];
  }

  current(): Trilha | undefined {
    return this.items[this.index - 1];
  }

  reset(): void {
    this.index = 0;
  }
}
