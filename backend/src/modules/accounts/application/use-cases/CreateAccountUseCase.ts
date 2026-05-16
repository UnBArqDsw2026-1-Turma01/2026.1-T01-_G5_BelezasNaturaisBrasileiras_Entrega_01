import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/IUserRepository';
import type { IAuthFacade } from '../../domain/interfaces/IAuthFacade';
import type { IUserFactoryRegistry } from '../../domain/interfaces/IUserFactoryRegistry';
import { CreateAccountInput } from '../dtos/CreateAccountInput';
import { CreateAccountOutput } from '../dtos/CreateAccountOutput';
import { UserRole } from '../../domain/entities/User';
import { UserMapper } from '../../infrastructure/mappers/UserMapper';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    @Inject('IAuthFacade')
    private authFacade: IAuthFacade,
    @Inject('IUserFactoryRegistry')
    private userFactoryRegistry: IUserFactoryRegistry,
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    let uid: string;

    try {
      const result = await this.authFacade.registerUser(input.email, input.password);
      uid = result.uid;
    } catch (error) {
      throw new Error(
        `Falha ao registrar no Supabase: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    const factory = this.userFactoryRegistry.get(UserRole.COMMON_USER);
    const user = factory.create(uid, input.email, input.nome);

    try {
      const savedUser = await this.userRepository.create(user);
      return UserMapper.toPersistence(savedUser);
    } catch (error) {
      try {
        await this.authFacade.removeUser(uid);
      } catch (rollbackError) {
        console.error(
          `Rollback falhou: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`,
        );
      }
      throw new Error(
        `Falha ao salvar no banco: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
