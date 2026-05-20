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
import { InscricaoFacade } from '../../application/InscricaoFacade';
import { FazerCheckinInput } from '../../application/dtos/FazerCheckinInput';

@Controller('inscricoes')
@UseGuards(JwtAuthGuard)
export class InscricoesController {
  constructor(private readonly inscricaoFacade: InscricaoFacade) {}

  /** Usuário solicita vaga em uma trilha */
  @Post('trilha/:trilhaId')
  @HttpCode(201)
  solicitar(@Param('trilhaId') trilhaId: string, @Request() req: JwtRequest) {
    return this.inscricaoFacade.solicitar(req.user.userId, trilhaId);
  }

  /** Lista as inscrições do usuário autenticado */
  @Get('minhas')
  minhas(@Request() req: JwtRequest) {
    return this.inscricaoFacade.minhas(req.user.userId);
  }

  /** Organizador aceita a inscrição → Singleton gera e salva o código */
  @Post(':id/aceitar')
  @HttpCode(200)
  aceitar(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.inscricaoFacade.aceitar(id, req.user.userId);
  }

  /** Organizador rejeita a inscrição */
  @Post(':id/rejeitar')
  @HttpCode(200)
  rejeitar(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.inscricaoFacade.rejeitar(id, req.user.userId);
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
    return this.inscricaoFacade.fazerCheckin(id, req.user.userId, body.codigo);
  }
}
