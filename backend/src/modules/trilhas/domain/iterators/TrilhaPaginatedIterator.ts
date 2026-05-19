import { Trilha } from '../entities/Trilha';
import { ITrilhaIterator } from './ITrilhaIterator';

export class TrilhaPaginatedIterator implements ITrilhaIterator {
  private localIndex = 0;
  private readonly pageItems: Trilha[];

  constructor(trilhas: Trilha[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    this.pageItems = trilhas.slice(start, start + pageSize);
  }

  hasNext(): boolean {
    return this.localIndex < this.pageItems.length;
  }

  next(): Trilha {
    return this.pageItems[this.localIndex++];
  }

  current(): Trilha | undefined {
    return this.pageItems[this.localIndex - 1];
  }

  reset(): void {
    this.localIndex = 0;
  }
}
