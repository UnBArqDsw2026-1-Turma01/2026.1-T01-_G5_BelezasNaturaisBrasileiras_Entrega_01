import { ConfirmationCodeService } from './domain/services/ConfirmationCodeService';

describe('ConfirmationCodeService — Singleton', () => {
  let service: ConfirmationCodeService;

  beforeEach(() => {
    service = ConfirmationCodeService.getInstance();
  });

  describe('getInstance()', () => {
    it('deve retornar sempre a mesma instância', () => {
      const instancia1 = ConfirmationCodeService.getInstance();
      const instancia2 = ConfirmationCodeService.getInstance();

      expect(instancia1).toBe(instancia2);
    });
  });

  describe('gerarCodigo()', () => {
    it('deve gerar um código com 8 caracteres alfanuméricos maiúsculos', () => {
      const codigo = service.gerarCodigo();

      expect(codigo).toMatch(/^[A-Z0-9]{8}$/);
    });

    it('deve gerar códigos únicos entre si', () => {
      const codigos = new Set<string>();
      for (let i = 0; i < 100; i++) {
        codigos.add(service.gerarCodigo());
      }

      expect(codigos.size).toBe(100);
    });
  });

  describe('validarCodigo()', () => {
    it('deve retornar true para código emitido', () => {
      const codigo = service.gerarCodigo();

      expect(service.validarCodigo(codigo)).toBe(true);
    });

    it('deve retornar false para código inexistente', () => {
      expect(service.validarCodigo('INVALIDO')).toBe(false);
    });
  });

  describe('revogarCodigo()', () => {
    it('deve invalidar o código após revogação', () => {
      const codigo = service.gerarCodigo();

      service.revogarCodigo(codigo);

      expect(service.validarCodigo(codigo)).toBe(false);
    });
  });
});
