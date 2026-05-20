import { Trilha } from '../entities/Trilha';

export interface ITrilhaRepository {
  create(trilha: Trilha): Promise<Trilha>;
  findById(id: string): Promise<Trilha | null>;
  findAll(): Promise<Trilha[]>;
  save(trilha: Trilha): Promise<Trilha>;
}
