import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';

@Injectable()
export class ChatActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async logActivity(payload: any) {
    // Placeholder: implement schema and logging
    return this.prisma.chatActivity.create({ data: { payload: JSON.stringify(payload) } });
  }
}
