//interface que sera implementada para integração com o IBGE para obter estados e cidades do Brasil

export interface IGeoProvider {
  listarEstados(): Promise<{ uf: string; nome: string }[]>;
  listarCidades(uf: string): Promise<{ id: number; nome: string }[]>;
}
