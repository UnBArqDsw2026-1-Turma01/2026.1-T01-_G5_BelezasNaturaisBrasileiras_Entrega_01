import { Badge } from '../../domain/entities/Badge';

type BadgeRaw = {
  id: string;
  participanteId: string;
  trilhaId: string;
  conquistadoEm: Date;
};

export class BadgeMapper {
  static toDomain(raw: BadgeRaw): Badge {
    return new Badge(raw.id, raw.participanteId, raw.trilhaId, raw.conquistadoEm);
  }
}
