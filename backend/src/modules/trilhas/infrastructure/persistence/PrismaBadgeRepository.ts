import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { IBadgeRepository } from '../../domain/interfaces/IBadgeRepository';
import { Badge } from '../../domain/entities/Badge';
import { BadgeMapper } from '../mappers/BadgeMapper';

@Injectable()
export class PrismaBadgeRepository implements IBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(participanteId: string, trilhaId: string): Promise<Badge> {
    const raw = await this.prisma.badge.upsert({
      where: { participanteId_trilhaId: { participanteId, trilhaId } },
      update: {},
      create: { participanteId, trilhaId },
    });
    return BadgeMapper.toDomain(raw);
  }

  async findByParticipanteId(participanteId: string): Promise<Badge[]> {
    const raws = await this.prisma.badge.findMany({
      where: { participanteId },
      orderBy: { conquistadoEm: 'desc' },
    });
    return raws.map((r) => BadgeMapper.toDomain(r));
  }
}
