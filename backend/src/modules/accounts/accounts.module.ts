import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AccountController } from './interface/controllers/AccountController';
import { CreateAccountUseCase } from './application/use-cases/CreateAccountUseCase';
import { PromoteUserUseCase } from './application/use-cases/PromoteUserUseCase';
import { PrismaUserRepository } from './infrastructure/persistence/PrismaUserRepository';
import { SupabaseAuthFacade } from './infrastructure/facades/SupabaseAuthFacade';
import { userFactoryProviders } from './interface/providers/UserFactoryProvider';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AccountController],
  providers: [
    PrismaService,
    JwtStrategy,
    CreateAccountUseCase,
    PromoteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'IAuthFacade',
      useClass: SupabaseAuthFacade,
    },
    ...userFactoryProviders,
  ],
  exports: ['IUserRepository', 'IUserFactoryRegistry'],
})
export class AccountsModule {}
