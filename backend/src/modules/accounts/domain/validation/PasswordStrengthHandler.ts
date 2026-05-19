import { BadRequestException } from '@nestjs/common';
import { AccountValidationHandler } from './AccountValidationHandler';
import { AccountValidationInput } from './AccountValidationInput';

export class PasswordStrengthHandler extends AccountValidationHandler {
  protected async validate(input: AccountValidationInput): Promise<void> {
    const { password } = input;
    if (password.length < 8) {
      throw new BadRequestException('Senha deve ter pelo menos 8 caracteres');
    }
    if (!/\d/.test(password)) {
      throw new BadRequestException('Senha deve conter pelo menos um dígito');
    }
  }
}
