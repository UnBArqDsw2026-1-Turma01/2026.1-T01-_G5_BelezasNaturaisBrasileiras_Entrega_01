import { Injectable } from '@nestjs/common';
import { CriarTrilhaUseCase } from './use-cases/CriarTrilhaUseCase';
import { ListarTrilhasUseCase } from './use-cases/ListarTrilhasUseCase';
import { FinalizarTrilhaUseCase } from './use-cases/FinalizarTrilhaUseCase';
import { Trilha } from '../domain/entities/Trilha';
import { CriarTrilhaInput } from './dtos/CriarTrilhaInput';

@Injectable()
export class TrilhaFacade {
  constructor(
    private readonly criarUC: CriarTrilhaUseCase,
    private readonly listarUC: ListarTrilhasUseCase,
    private readonly finalizarUC: FinalizarTrilhaUseCase,
  ) {}

  criar(organizadorId: string, input: CriarTrilhaInput): Promise<Trilha> {
    return this.criarUC.execute(organizadorId, input);
  }

  listar(): Promise<Trilha[]> {
    return this.listarUC.execute();
  }

  finalizar(trilhaId: string, organizadorId: string): Promise<void> {
    return this.finalizarUC.execute(trilhaId, organizadorId);
  }
}
