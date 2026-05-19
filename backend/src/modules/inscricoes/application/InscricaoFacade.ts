import { Injectable } from '@nestjs/common';
import { SolicitarInscricaoUseCase } from './use-cases/SolicitarInscricaoUseCase';
import { AceitarInscricaoUseCase } from './use-cases/AceitarInscricaoUseCase';
import { RejeitarInscricaoUseCase } from './use-cases/RejeitarInscricaoUseCase';
import { FazerCheckinUseCase } from './use-cases/FazerCheckinUseCase';
import { ListarInscricoesUseCase } from './use-cases/ListarInscricoesUseCase';
import { Inscricao } from '../domain/entities/Inscricao';

@Injectable()
export class InscricaoFacade {
  constructor(
    private readonly solicitarUC: SolicitarInscricaoUseCase,
    private readonly aceitarUC: AceitarInscricaoUseCase,
    private readonly rejeitarUC: RejeitarInscricaoUseCase,
    private readonly fazerCheckinUC: FazerCheckinUseCase,
    private readonly listarUC: ListarInscricoesUseCase,
  ) {}

  solicitar(usuarioId: string, trilhaId: string): Promise<Inscricao> {
    return this.solicitarUC.execute(usuarioId, trilhaId);
  }

  aceitar(inscricaoId: string, organizadorId: string): Promise<Inscricao> {
    return this.aceitarUC.execute(inscricaoId, organizadorId);
  }

  rejeitar(inscricaoId: string, organizadorId: string): Promise<Inscricao> {
    return this.rejeitarUC.execute(inscricaoId, organizadorId);
  }

  fazerCheckin(
    inscricaoId: string,
    organizadorId: string,
    codigo: string,
  ): Promise<Inscricao> {
    return this.fazerCheckinUC.execute(inscricaoId, organizadorId, codigo);
  }

  minhas(usuarioId: string): Promise<Inscricao[]> {
    return this.listarUC.minhas(usuarioId);
  }
}
