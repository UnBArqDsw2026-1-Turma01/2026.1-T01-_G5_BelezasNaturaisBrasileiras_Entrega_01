// src/modules/accounts/infrastructure/factories/CommonUserFactory.ts

import { Injectable } from '@nestjs/common';
import { IUserFactory } from '../../domain/interfaces/IUserFactory';
import { User, UserRole } from '../../domain/entities/User';

@Injectable()
export class CommonUserFactory implements IUserFactory {
  create(id: string, email: string, nome: string): User {
    return new User(id, email, nome, UserRole.COMMON_USER);
  }
}
