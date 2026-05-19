import { Trilha } from '../entities/Trilha';
import { TrilhaStatus } from '../enums/TrilhaStatus';
import { TrilhaFilteredIterator } from './TrilhaFilteredIterator';
import { TrilhaPaginatedIterator } from './TrilhaPaginatedIterator';

const makeTrilha = (id: string, status: TrilhaStatus): Trilha =>
  new Trilha(
    id,
    `Trilha ${id}`,
    'Desc',
    'org-1',
    'Ponto',
    new Date(),
    10,
    status,
  );

const trilhas = [
  makeTrilha('1', TrilhaStatus.ATIVA),
  makeTrilha('2', TrilhaStatus.ATIVA),
  makeTrilha('3', TrilhaStatus.LOTADA),
  makeTrilha('4', TrilhaStatus.INATIVA),
  makeTrilha('5', TrilhaStatus.ATIVA),
];

describe('TrilhaFilteredIterator', () => {
  it('should iterate only ATIVA trilhas', () => {
    const iter = new TrilhaFilteredIterator(trilhas, TrilhaStatus.ATIVA);
    const results: Trilha[] = [];
    while (iter.hasNext()) results.push(iter.next());
    expect(results).toHaveLength(3);
    expect(results.every((t) => t.status === TrilhaStatus.ATIVA)).toBe(true);
  });

  it('should return all trilhas when no filter is provided', () => {
    const iter = new TrilhaFilteredIterator(trilhas);
    const results: Trilha[] = [];
    while (iter.hasNext()) results.push(iter.next());
    expect(results).toHaveLength(5);
  });

  it('should reset and iterate from beginning', () => {
    const iter = new TrilhaFilteredIterator(trilhas, TrilhaStatus.ATIVA);
    iter.next();
    iter.reset();
    expect(iter.next().id).toBe('1');
  });

  it('should return current item without advancing', () => {
    const iter = new TrilhaFilteredIterator(trilhas, TrilhaStatus.ATIVA);
    iter.next();
    expect(iter.current()?.id).toBe('1');
  });
});

describe('TrilhaPaginatedIterator', () => {
  it('should return first page', () => {
    const iter = new TrilhaPaginatedIterator(trilhas, 1, 2);
    const results: Trilha[] = [];
    while (iter.hasNext()) results.push(iter.next());
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe('1');
    expect(results[1].id).toBe('2');
  });

  it('should return second page', () => {
    const iter = new TrilhaPaginatedIterator(trilhas, 2, 2);
    const results: Trilha[] = [];
    while (iter.hasNext()) results.push(iter.next());
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe('3');
  });

  it('should return partial last page', () => {
    const iter = new TrilhaPaginatedIterator(trilhas, 3, 2);
    const results: Trilha[] = [];
    while (iter.hasNext()) results.push(iter.next());
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('5');
  });

  it('hasNext returns false for empty page', () => {
    const iter = new TrilhaPaginatedIterator(trilhas, 10, 2);
    expect(iter.hasNext()).toBe(false);
  });
});
