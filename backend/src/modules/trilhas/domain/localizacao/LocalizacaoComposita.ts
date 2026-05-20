import { ILocalizacaoComponent } from '../interfaces/ILocalizacaoComponent';

export class LocalizacaoComposita implements ILocalizacaoComponent {
  private filhos: ILocalizacaoComponent[] = [];

  constructor(
    private readonly nome: string,
    private readonly tipo: 'estado' | 'cidade' | 'regiao',
  ) {}

  getNome(): string {
    return this.nome;
  }

  getTipo(): 'estado' | 'cidade' | 'regiao' {
    return this.tipo;
  }

  adicionar(componente: ILocalizacaoComponent): void {
    this.filhos.push(componente);
  }

  remover(componente: ILocalizacaoComponent): void {
    this.filhos = this.filhos.filter((f) => f !== componente);
  }

  listarFilhos(): ILocalizacaoComponent[] {
    return [...this.filhos];
  }

  getQuantidadePontos(): number {
    return this.filhos.reduce(
      (total, filho) => total + filho.getQuantidadePontos(),
      0,
    );
  }
}
