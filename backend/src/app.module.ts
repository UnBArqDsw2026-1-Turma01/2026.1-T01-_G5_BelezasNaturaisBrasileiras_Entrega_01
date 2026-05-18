import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TrilhasModule } from './modules/trilhas/trilhas.module';
import { InscricoesModule } from './modules/inscricoes/inscricoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    AccountsModule,
    TrilhasModule,
    InscricoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
