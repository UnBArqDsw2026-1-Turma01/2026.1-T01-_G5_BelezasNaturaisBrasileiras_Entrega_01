import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';
import { ConfirmationCodeService } from '../trilhas/domain/services/ConfirmationCodeService';
import { PrismaTrilhaRepository } from '../trilhas/infrastructure/persistence/PrismaTrilhaRepository';
import { PrismaInscricaoRepository } from './infrastructure/persistence/PrismaInscricaoRepository';
import { SolicitarInscricaoUseCase } from './application/use-cases/SolicitarInscricaoUseCase';
import { AceitarInscricaoUseCase } from './application/use-cases/AceitarInscricaoUseCase';
import { RejeitarInscricaoUseCase } from './application/use-cases/RejeitarInscricaoUseCase';
import { FazerCheckinUseCase } from './application/use-cases/FazerCheckinUseCase';
import { ListarInscricoesUseCase } from './application/use-cases/ListarInscricoesUseCase';
import { InscricaoFacade } from './application/InscricaoFacade';
import { InscricoesController } from './interface/controllers/InscricoesController';

@Module({
  imports: [PassportModule],
  controllers: [InscricoesController],
  providers: [
    PrismaService,
    {
      provide: ConfirmationCodeService,
      useValue: ConfirmationCodeService.getInstance(),
    },
    { provide: 'ITrilhaRepository', useClass: PrismaTrilhaRepository },
    { provide: 'IInscricaoRepository', useClass: PrismaInscricaoRepository },
    SolicitarInscricaoUseCase,
    AceitarInscricaoUseCase,
    RejeitarInscricaoUseCase,
    FazerCheckinUseCase,
    ListarInscricoesUseCase,
    InscricaoFacade,
  ],
  exports: ['IInscricaoRepository', ListarInscricoesUseCase],
})
export class InscricoesModule {}
