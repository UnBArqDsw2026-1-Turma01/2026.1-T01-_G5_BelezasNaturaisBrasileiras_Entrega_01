import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { PontosTuristicosModule } from './modules/pontos-turisticos/pontos-turisticos.module';
import { ChatModule } from './modules/chat/chat.module';
import { AdaptersModule } from './modules/adapters/adapters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    AccountsModule,
    PontosTuristicosModule,
    ChatModule,
    AdaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
