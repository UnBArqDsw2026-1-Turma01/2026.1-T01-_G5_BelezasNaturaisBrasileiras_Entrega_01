import { UnprocessableEntityException } from '@nestjs/common';
import { AccountValidationHandler } from './AccountValidationHandler';
import { AccountValidationInput } from './AccountValidationInput';

export class TermsAcceptanceHandler extends AccountValidationHandler {
  protected async validate(input: AccountValidationInput): Promise<void> {
    if (!input.aceitouTermos) {
      throw new UnprocessableEntityException(
        'É obrigatório aceitar os termos de uso',
      );
    }
  }
}
