import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { PontosTuristicosModule } from './modules/pontos-turisticos/pontos-turisticos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    AccountsModule,
    PontosTuristicosModule,
    // New modules
    (await import('./modules/chat/chat.module')).ChatModule,
    (await import('./modules/adapters/adapters.module')).AdaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
