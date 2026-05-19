import {
  ConflictException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InscricaoFacade } from './InscricaoFacade';
import { SolicitarInscricaoUseCase } from './use-cases/SolicitarInscricaoUseCase';
import { AceitarInscricaoUseCase } from './use-cases/AceitarInscricaoUseCase';
import { RejeitarInscricaoUseCase } from './use-cases/RejeitarInscricaoUseCase';
import { FazerCheckinUseCase } from './use-cases/FazerCheckinUseCase';
import { ListarInscricoesUseCase } from './use-cases/ListarInscricoesUseCase';
import { Inscricao } from '../domain/entities/Inscricao';
import { InscricaoStatus } from '../domain/enums/InscricaoStatus';

const makeInscricao = (overrides: Partial<Inscricao> = {}): Inscricao =>
  Object.assign(new Inscricao('inscricao-1', 'trilha-1', 'user-1'), overrides);

describe('InscricaoFacade', () => {
  let facade: InscricaoFacade;
  let solicitarUC: jest.Mocked<SolicitarInscricaoUseCase>;
  let aceitarUC: jest.Mocked<AceitarInscricaoUseCase>;
  let rejeitarUC: jest.Mocked<RejeitarInscricaoUseCase>;
  let fazerCheckinUC: jest.Mocked<FazerCheckinUseCase>;
  let listarUC: jest.Mocked<ListarInscricoesUseCase>;

  beforeEach(() => {
    solicitarUC = { execute: jest.fn() } as any;
    aceitarUC = { execute: jest.fn() } as any;
    rejeitarUC = { execute: jest.fn() } as any;
    fazerCheckinUC = { execute: jest.fn() } as any;
    listarUC = { minhas: jest.fn(), porTrilha: jest.fn() } as any;

    facade = new InscricaoFacade(
      solicitarUC,
      aceitarUC,
      rejeitarUC,
      fazerCheckinUC,
      listarUC,
    );
  });

  // ─── solicitar() ──────────────────────────────────────────────────────────

  describe('solicitar()', () => {
    it('deve delegar ao SolicitarInscricaoUseCase com os parâmetros corretos', async () => {
      // Arrange
      const inscricao = makeInscricao();
      solicitarUC.execute.mockResolvedValue(inscricao);

      // Act
      const result = await facade.solicitar('user-1', 'trilha-1');

      // Assert
      expect(solicitarUC.execute).toHaveBeenCalledWith('user-1', 'trilha-1');
      expect(result).toBe(inscricao);
    });

    it('deve propagar ConflictException quando usuário já está inscrito', async () => {
      // Arrange
      solicitarUC.execute.mockRejectedValue(
        new ConflictException('Você já possui uma inscrição nesta trilha'),
      );

      // Act & Assert
      await expect(facade.solicitar('user-1', 'trilha-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve propagar NotFoundException quando trilha não existe', async () => {
      // Arrange
      solicitarUC.execute.mockRejectedValue(
        new NotFoundException('Trilha não encontrada'),
      );

      // Act & Assert
      await expect(
        facade.solicitar('user-1', 'trilha-inexistente'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ─── aceitar() ────────────────────────────────────────────────────────────

  describe('aceitar()', () => {
    it('deve delegar ao AceitarInscricaoUseCase com os parâmetros corretos', async () => {
      // Arrange
      const inscricao = makeInscricao({ status: InscricaoStatus.ACEITA });
      aceitarUC.execute.mockResolvedValue(inscricao);

      // Act
      const result = await facade.aceitar('inscricao-1', 'organizador-1');

      // Assert
      expect(aceitarUC.execute).toHaveBeenCalledWith(
        'inscricao-1',
        'organizador-1',
      );
      expect(result).toBe(inscricao);
    });

    it('deve propagar ForbiddenException quando usuário não é o organizador', async () => {
      // Arrange
      aceitarUC.execute.mockRejectedValue(
        new ForbiddenException('Apenas o organizador pode aceitar inscrições'),
      );

      // Act & Assert
      await expect(facade.aceitar('inscricao-1', 'outro-user')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  // ─── rejeitar() ───────────────────────────────────────────────────────────

  describe('rejeitar()', () => {
    it('deve delegar ao RejeitarInscricaoUseCase com os parâmetros corretos', async () => {
      // Arrange
      const inscricao = makeInscricao({ status: InscricaoStatus.REJEITADA });
      rejeitarUC.execute.mockResolvedValue(inscricao);

      // Act
      const result = await facade.rejeitar('inscricao-1', 'organizador-1');

      // Assert
      expect(rejeitarUC.execute).toHaveBeenCalledWith(
        'inscricao-1',
        'organizador-1',
      );
      expect(result).toBe(inscricao);
    });

    it('deve propagar ForbiddenException quando usuário não é o organizador', async () => {
      // Arrange
      rejeitarUC.execute.mockRejectedValue(
        new ForbiddenException('Apenas o organizador pode rejeitar inscrições'),
      );

      // Act & Assert
      await expect(
        facade.rejeitar('inscricao-1', 'outro-user'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ─── fazerCheckin() ───────────────────────────────────────────────────────

  describe('fazerCheckin()', () => {
    it('deve delegar ao FazerCheckinUseCase com os parâmetros corretos', async () => {
      // Arrange
      const inscricao = makeInscricao({ status: InscricaoStatus.PRESENTE });
      fazerCheckinUC.execute.mockResolvedValue(inscricao);

      // Act
      const result = await facade.fazerCheckin(
        'inscricao-1',
        'organizador-1',
        'ABCD1234',
      );

      // Assert
      expect(fazerCheckinUC.execute).toHaveBeenCalledWith(
        'inscricao-1',
        'organizador-1',
        'ABCD1234',
      );
      expect(result).toBe(inscricao);
    });

    it('deve propagar BadRequestException quando código é inválido', async () => {
      // Arrange
      fazerCheckinUC.execute.mockRejectedValue(
        new BadRequestException('Código de confirmação inválido'),
      );

      // Act & Assert
      await expect(
        facade.fazerCheckin('inscricao-1', 'organizador-1', 'INVALIDO'),
      ).rejects.toThrow(BadRequestException);
    });

    it('deve propagar ForbiddenException quando usuário não é o organizador', async () => {
      // Arrange
      fazerCheckinUC.execute.mockRejectedValue(
        new ForbiddenException('Apenas o organizador pode fazer check-in'),
      );

      // Act & Assert
      await expect(
        facade.fazerCheckin('inscricao-1', 'outro-user', 'ABCD1234'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ─── minhas() ─────────────────────────────────────────────────────────────

  describe('minhas()', () => {
    it('deve delegar ao ListarInscricoesUseCase.minhas() com o usuarioId correto', async () => {
      // Arrange
      const inscricoes = [
        makeInscricao(),
        makeInscricao({ id: 'inscricao-2' } as any),
      ];
      listarUC.minhas.mockResolvedValue(inscricoes);

      // Act
      const result = await facade.minhas('user-1');

      // Assert
      expect(listarUC.minhas).toHaveBeenCalledWith('user-1');
      expect(result).toBe(inscricoes);
    });

    it('deve retornar array vazio quando usuário não tem inscrições', async () => {
      // Arrange
      listarUC.minhas.mockResolvedValue([]);

      // Act
      const result = await facade.minhas('user-sem-inscricoes');

      // Assert
      expect(result).toEqual([]);
    });
  });
});
