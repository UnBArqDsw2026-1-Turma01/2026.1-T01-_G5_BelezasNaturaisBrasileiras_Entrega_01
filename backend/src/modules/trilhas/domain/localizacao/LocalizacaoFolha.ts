import { ILocalizacaoComponent } from '../interfaces/ILocalizacaoComponent';

export class LocalizacaoFolha implements ILocalizacaoComponent {
  constructor(
    private readonly nome: string,
    private readonly descricao: string = '',
  ) {}

  getNome(): string {
    return this.nome;
  }

  getTipo(): 'ponto' {
    return 'ponto';
  }

  getQuantidadePontos(): number {
    return 1;
  }

  getDescricao(): string {
    return this.descricao;
  }
}
