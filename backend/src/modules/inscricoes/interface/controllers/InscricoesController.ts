import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../accounts/auth/guards/jwt-auth.guard';
import { JwtRequest } from '../../../accounts/auth/types/jwt-request.type';
import { SolicitarInscricaoUseCase } from '../../application/use-cases/SolicitarInscricaoUseCase';
import { AceitarInscricaoUseCase } from '../../application/use-cases/AceitarInscricaoUseCase';
import { RejeitarInscricaoUseCase } from '../../application/use-cases/RejeitarInscricaoUseCase';
import { FazerCheckinUseCase } from '../../application/use-cases/FazerCheckinUseCase';
import { ListarInscricoesUseCase } from '../../application/use-cases/ListarInscricoesUseCase';
import { FazerCheckinInput } from '../../application/dtos/FazerCheckinInput';

@Controller('inscricoes')
@UseGuards(JwtAuthGuard)
export class InscricoesController {
  constructor(
    private readonly solicitarInscricaoUseCase: SolicitarInscricaoUseCase,
    private readonly aceitarInscricaoUseCase: AceitarInscricaoUseCase,
    private readonly rejeitarInscricaoUseCase: RejeitarInscricaoUseCase,
    private readonly fazerCheckinUseCase: FazerCheckinUseCase,
    private readonly listarInscricoesUseCase: ListarInscricoesUseCase,
  ) {}

  /** Usuário solicita vaga em uma trilha */
  @Post('trilha/:trilhaId')
  @HttpCode(201)
  solicitar(@Param('trilhaId') trilhaId: string, @Request() req: JwtRequest) {
    return this.solicitarInscricaoUseCase.execute(req.user.userId, trilhaId);
  }

  /** Lista as inscrições do usuário autenticado */
  @Get('minhas')
  minhas(@Request() req: JwtRequest) {
    return this.listarInscricoesUseCase.minhas(req.user.userId);
  }

  /** Organizador aceita a inscrição → Singleton gera e salva o código */
  @Post(':id/aceitar')
  @HttpCode(200)
  aceitar(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.aceitarInscricaoUseCase.execute(id, req.user.userId);
  }

  /** Organizador rejeita a inscrição */
  @Post(':id/rejeitar')
  @HttpCode(200)
  rejeitar(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.rejeitarInscricaoUseCase.execute(id, req.user.userId);
  }

  /**
   * Organizador faz check-in do participante no ponto de encontro.
   * Valida o código via Singleton + banco de dados.
   */
  @Post(':id/checkin')
  @HttpCode(200)
  checkin(
    @Param('id') id: string,
    @Request() req: JwtRequest,
    @Body() body: FazerCheckinInput,
  ) {
    return this.fazerCheckinUseCase.execute(id, req.user.userId, body.codigo);
  }
}
