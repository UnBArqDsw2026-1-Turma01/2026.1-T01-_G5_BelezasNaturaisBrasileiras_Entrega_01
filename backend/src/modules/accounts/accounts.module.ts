import { Module } from '@nestjs/common';
import { AccountController } from './interface/controllers/AccountController';
import { CreateAccountUseCase } from './application/use-cases/CreateAccountUseCase';
import { PrismaUserRepository } from './infrastructure/persistence/PrismaUserRepository';
import { SupabaseAuthService } from './infrastructure/services/SupabaseAuthService';
import { userFactoryProviders } from './interface/providers/UserFactoryProvider';
import { IUserRepository } from './domain/interfaces/IUserRepository';
import { ISupabaseAuthService } from './domain/interfaces/ISupabaseAuthService';
import { IUserFactoryRegistry } from './domain/interfaces/IUserFactoryRegistry';
import { supabaseProvider } from '../../shared/infrastructure/supabase/supabase.provider';

@Module({
  controllers: [AccountController],
  providers: [
    supabaseProvider,
    CreateAccountUseCase,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'ISupabaseAuthService',
      useClass: SupabaseAuthService,
    },
    ...userFactoryProviders,
  ],
  exports: ['IUserRepository', 'IUserFactoryRegistry'],
})
export class AccountsModule {}
