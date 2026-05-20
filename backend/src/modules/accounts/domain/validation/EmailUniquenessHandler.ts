import { ConflictException } from '@nestjs/common';
import { AccountValidationHandler } from './AccountValidationHandler';
import { AccountValidationInput } from './AccountValidationInput';
import { IUserRepository } from '../interfaces/IUserRepository';

export class EmailUniquenessHandler extends AccountValidationHandler {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  protected async validate(input: AccountValidationInput): Promise<void> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }
  }
}
