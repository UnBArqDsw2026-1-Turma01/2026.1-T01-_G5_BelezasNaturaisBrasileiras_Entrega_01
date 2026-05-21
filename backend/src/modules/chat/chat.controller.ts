import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ChatSessionManagerService } from './chat-session.manager.service';
import { ChatObjectPoolService } from './pool/chat-object-pool.service';
import { ChatSessionRepository } from './repositories/chat-session.repository';
import { ChatActivityRepository } from './repositories/chat-activity.repository';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly sessionManager: ChatSessionManagerService,
    private readonly pool: ChatObjectPoolService,
    private readonly sessionRepo: ChatSessionRepository,
    private readonly activityRepo: ChatActivityRepository,
  ) {}

  @Get('pool/status')
  poolStatus() {
    return { poolSize: this.pool.size(), pattern: 'Object Pool' };
  }

  @Post('sessions')
  async startSession(@Body() body: { userAId: string; userBId: string }) {
    const session = await this.sessionRepo.createSession({
      userAId: body.userAId,
      userBId: body.userBId,
    });
    return session;
  }

  @Post('sessions/:id/messages')
  async sendMessage(
    @Param('id') sessionId: string,
    @Body() body: { message: string },
  ) {
    return this.sessionManager.withConnection(async (conn) => {
      await conn.send({ sessionId, message: body.message });
      await this.activityRepo.logActivity(sessionId, { message: body.message, from: 'test-user' });
      return {
        connectionId: conn.id,
        sessionId,
        delivered: true,
        poolSizeAfter: this.pool.size(),
      };
    });
  }

  @Delete('sessions/:id')
  async endSession(@Param('id') id: string) {
    return this.sessionRepo.endSession(id);
  }
}
