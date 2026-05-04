import { User, UserRole } from '../../domain/entities/User';
import { CreateAccountOutput } from '../../application/dtos/CreateAccountOutput';

export class UserMapper {
  static toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.email,
      raw.nome,
      raw.role as UserRole,
      raw.fotoPerfil,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(user: User): CreateAccountOutput {
    return {
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
