export class ConfirmationCodeService {
  private static instance: ConfirmationCodeService;

  private readonly codigosEmitidos: Set<string>;

  private readonly CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private readonly CODIGO_LENGTH = 8;

  private constructor() {
    this.codigosEmitidos = new Set();
  }

  static getInstance(): ConfirmationCodeService {
    if (!ConfirmationCodeService.instance) {
      ConfirmationCodeService.instance = new ConfirmationCodeService();
    }
    return ConfirmationCodeService.instance;
  }

  gerarCodigo(): string {
    let codigo: string;
    do {
      codigo = this.gerarCodigoAleatorio();
    } while (this.codigosEmitidos.has(codigo));

    this.codigosEmitidos.add(codigo);
    return codigo;
  }

  validarCodigo(codigo: string): boolean {
    return this.codigosEmitidos.has(codigo);
  }

  revogarCodigo(codigo: string): void {
    this.codigosEmitidos.delete(codigo);
  }

  get totalCodigosAtivos(): number {
    return this.codigosEmitidos.size;
  }

  private gerarCodigoAleatorio(): string {
    let resultado = '';
    for (let i = 0; i < this.CODIGO_LENGTH; i++) {
      resultado += this.CHARSET.charAt(
        Math.floor(Math.random() * this.CHARSET.length),
      );
    }
    return resultado;
  }
}
