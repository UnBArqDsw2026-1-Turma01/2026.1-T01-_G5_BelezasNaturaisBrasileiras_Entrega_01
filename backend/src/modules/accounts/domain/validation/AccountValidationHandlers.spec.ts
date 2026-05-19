import {
  ConflictException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountValidationInput } from './AccountValidationInput';
import { AccountValidationHandler } from './AccountValidationHandler';
import { EmailUniquenessHandler } from './EmailUniquenessHandler';
import { PasswordStrengthHandler } from './PasswordStrengthHandler';
import { TermsAcceptanceHandler } from './TermsAcceptanceHandler';
import { IUserRepository } from '../interfaces/IUserRepository';

const makeInput = (
  overrides: Partial<AccountValidationInput> = {},
): AccountValidationInput => ({
  email: 'test@example.com',
  password: 'Senha123',
  nome: 'Test User',
  aceitouTermos: true,
  ...overrides,
});

const makeUserRepo = (foundUser: any = null): jest.Mocked<IUserRepository> =>
  ({ findByEmail: jest.fn().mockResolvedValue(foundUser) }) as any;

describe('AccountValidationHandlers', () => {
  describe('EmailUniquenessHandler', () => {
    it('should pass when email is not registered', async () => {
      const repo = makeUserRepo(null);
      const handler = new EmailUniquenessHandler(repo);
      await expect(handler.handle(makeInput())).resolves.not.toThrow();
    });

    it('should throw ConflictException when email is already registered', async () => {
      const repo = makeUserRepo({ id: '1', email: 'test@example.com' });
      const handler = new EmailUniquenessHandler(repo);
      await expect(handler.handle(makeInput())).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('PasswordStrengthHandler', () => {
    it('should pass for a strong password', async () => {
      const handler = new PasswordStrengthHandler();
      await expect(
        handler.handle(makeInput({ password: 'Senha123' })),
      ).resolves.not.toThrow();
    });

    it('should throw BadRequestException when password is shorter than 8 chars', async () => {
      const handler = new PasswordStrengthHandler();
      await expect(
        handler.handle(makeInput({ password: 'abc123' })),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when password has no digits', async () => {
      const handler = new PasswordStrengthHandler();
      await expect(
        handler.handle(makeInput({ password: 'SenhaForte' })),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('TermsAcceptanceHandler', () => {
    it('should pass when terms are accepted', async () => {
      const handler = new TermsAcceptanceHandler();
      await expect(
        handler.handle(makeInput({ aceitouTermos: true })),
      ).resolves.not.toThrow();
    });

    it('should throw UnprocessableEntityException when terms are not accepted', async () => {
      const handler = new TermsAcceptanceHandler();
      await expect(
        handler.handle(makeInput({ aceitouTermos: false })),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('Chain behavior', () => {
    it('should run all three handlers when all pass', async () => {
      const repo = makeUserRepo(null);
      const email = new EmailUniquenessHandler(repo);
      const password = new PasswordStrengthHandler();
      const terms = new TermsAcceptanceHandler();
      email.setNext(password).setNext(terms);
      await expect(email.handle(makeInput())).resolves.not.toThrow();
    });

    it('should stop chain when first handler throws — subsequent handlers not called', async () => {
      const repo = makeUserRepo({ id: '1' });
      const email = new EmailUniquenessHandler(repo);

      // Mock next handler to track if it was called
      let nextWasCalled = false;
      const mockNext: AccountValidationHandler = {
        handle: jest.fn().mockImplementation(async () => {
          nextWasCalled = true;
        }),
        setNext: jest.fn(),
        validate: jest.fn(),
      } as any;
      email.setNext(mockNext);

      await expect(email.handle(makeInput())).rejects.toThrow(
        ConflictException,
      );
      expect(nextWasCalled).toBe(false);
    });
  });
});
