import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ITrilhaRepository } from '../../domain/interfaces/ITrilhaRepository';
import { Trilha } from '../../domain/entities/Trilha';
import { CriarTrilhaInput } from '../dtos/CriarTrilhaInput';

@Injectable()
export class CriarTrilhaUseCase {
  constructor(
    @Inject('ITrilhaRepository')
    private readonly trilhaRepository: ITrilhaRepository,
  ) {}

  async execute(
    organizadorId: string,
    input: CriarTrilhaInput,
  ): Promise<Trilha> {
    const trilha = new Trilha(
      randomUUID(),
      input.titulo,
      input.descricao,
      organizadorId,
      input.pontoEncontro,
      new Date(input.dataInicio),
      input.vagasMaximas,
    );
    return this.trilhaRepository.create(trilha);
  }
}
