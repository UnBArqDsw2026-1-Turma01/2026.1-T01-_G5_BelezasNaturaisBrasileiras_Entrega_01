import { Trilha } from '../entities/Trilha';

export interface ITrilhaIterator {
  hasNext(): boolean;
  next(): Trilha;
  current(): Trilha | undefined;
  reset(): void;
}
