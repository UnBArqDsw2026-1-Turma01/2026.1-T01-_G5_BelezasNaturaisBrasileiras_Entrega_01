import { Injectable, Inject } from '@nestjs/common';
import { ITrilhaRepository } from '../../domain/interfaces/ITrilhaRepository';
import { Trilha } from '../../domain/entities/Trilha';

@Injectable()
export class ListarTrilhasUseCase {
  constructor(
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
  ) {}

  async execute(): Promise<Trilha[]> {
    return this.trilhaRepository.findAll();
  }
}
