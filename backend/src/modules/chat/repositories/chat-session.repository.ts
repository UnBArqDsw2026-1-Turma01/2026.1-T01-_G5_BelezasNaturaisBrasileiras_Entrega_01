import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';

@Injectable()
export class ChatSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(data: { userAId: string; userBId: string; connectionId?: string }) {
    // Prisma model needs to be added in schema; this is a placeholder
    return this.prisma.chatSession.create({ data });
  }

  async endSession(id: string) {
    return this.prisma.chatSession.update({ where: { id }, data: { endedAt: new Date() } });
  }
}
