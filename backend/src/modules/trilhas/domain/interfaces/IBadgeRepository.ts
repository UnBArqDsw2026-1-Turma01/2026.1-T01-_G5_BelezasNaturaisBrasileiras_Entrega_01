import { Badge } from '../entities/Badge';

export interface IBadgeRepository {
  create(participanteId: string, trilhaId: string): Promise<Badge>;
  findByParticipanteId(participanteId: string): Promise<Badge[]>;
}
