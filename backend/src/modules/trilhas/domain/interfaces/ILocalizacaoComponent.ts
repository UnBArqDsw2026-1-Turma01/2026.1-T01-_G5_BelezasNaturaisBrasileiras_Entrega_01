export interface ILocalizacaoComponent {
  getNome(): string;
  getTipo(): 'estado' | 'cidade' | 'regiao' | 'ponto';
  getQuantidadePontos(): number;
  adicionar?(componente: ILocalizacaoComponent): void;
  remover?(componente: ILocalizacaoComponent): void;
  listarFilhos?(): ILocalizacaoComponent[];
}
