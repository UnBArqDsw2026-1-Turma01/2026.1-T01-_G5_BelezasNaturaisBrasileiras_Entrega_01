import { Injectable } from '@nestjs/common';
import { IGeoProvider } from '../interfaces/IGeoProvider';

@Injectable()
export class IbgeAdapter implements IGeoProvider {
  private readonly apiUrl =
    'https://servicodados.ibge.gov.br/api/v1/localidades';

  async listarEstados(): Promise<{ uf: string; nome: string }[]> {
    const resposta = await fetch(`${this.apiUrl}/estados?orderBy=nome`);
    const raw: any[] = await resposta.json();
    return raw.map((estado) => ({
      uf: estado.sigla,
      nome: estado.nome,
    }));
  }

  async listarCidades(uf: string): Promise<{ id: number; nome: string }[]> {
    const resposta = await fetch(`${this.apiUrl}/estados/${uf}/municipios`);
    const raw: any[] = await resposta.json();
    return raw.map((cidade) => ({
      id: cidade.id,
      nome: cidade.nome,
    }));
  }
}
