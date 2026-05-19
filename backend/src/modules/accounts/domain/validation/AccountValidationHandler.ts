import { AccountValidationInput } from './AccountValidationInput';

export abstract class AccountValidationHandler {
  private nextHandler: AccountValidationHandler | null = null;

  setNext(handler: AccountValidationHandler): AccountValidationHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(input: AccountValidationInput): Promise<void> {
    await this.validate(input);
    if (this.nextHandler) {
      await this.nextHandler.handle(input);
    }
  }

  protected abstract validate(input: AccountValidationInput): Promise<void>;
}
