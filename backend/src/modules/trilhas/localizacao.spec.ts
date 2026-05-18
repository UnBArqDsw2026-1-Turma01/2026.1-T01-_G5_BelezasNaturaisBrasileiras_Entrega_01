import { LocalizacaoFolha } from './domain/localizacao/LocalizacaoFolha';
import { LocalizacaoComposita } from './domain/localizacao/LocalizacaoComposita';

describe('Composite de Localização', () => {
  describe('LocalizacaoFolha', () => {
    it('deve retornar 1 ponto para uma folha', () => {
      const ponto = new LocalizacaoFolha('Chapada dos Veadeiros');

      expect(ponto.getQuantidadePontos()).toBe(1);
      expect(ponto.getTipo()).toBe('ponto');
      expect(ponto.getNome()).toBe('Chapada dos Veadeiros');
    });

    it('não deve expor métodos de composição', () => {
      const ponto = new LocalizacaoFolha('Serra da Canastra');

      expect('adicionar' in ponto).toBe(false);
      expect('remover' in ponto).toBe(false);
      expect('listarFilhos' in ponto).toBe(false);
    });
  });

  describe('LocalizacaoComposita', () => {
    it('deve acumular pontos dos filhos recursivamente', () => {
      const goias = new LocalizacaoComposita('Goiás', 'estado');
      const altoPlanaltoCentral = new LocalizacaoComposita(
        'Alto Planalto Central',
        'regiao',
      );
      const chapada = new LocalizacaoFolha('Chapada dos Veadeiros');
      const caldas = new LocalizacaoFolha('Caldas Novas');

      altoPlanaltoCentral.adicionar(chapada);
      altoPlanaltoCentral.adicionar(caldas);
      goias.adicionar(altoPlanaltoCentral);

      expect(goias.getQuantidadePontos()).toBe(2);
      expect(altoPlanaltoCentral.getQuantidadePontos()).toBe(2);
    });

    it('deve retornar 0 quando não há filhos', () => {
      const estado = new LocalizacaoComposita('Amazonas', 'estado');

      expect(estado.getQuantidadePontos()).toBe(0);
    });

    it('deve listar os filhos adicionados', () => {
      const cidade = new LocalizacaoComposita(
        'Alto Paraíso de Goiás',
        'cidade',
      );
      const p1 = new LocalizacaoFolha('Poço Azul');
      const p2 = new LocalizacaoFolha('Vale da Lua');

      cidade.adicionar(p1);
      cidade.adicionar(p2);

      const filhos = cidade.listarFilhos();
      expect(filhos).toHaveLength(2);
      expect(filhos[0].getNome()).toBe('Poço Azul');
    });

    it('deve remover um filho corretamente', () => {
      const regiao = new LocalizacaoComposita('Cerrado', 'regiao');
      const ponto = new LocalizacaoFolha('Parque Nacional');

      regiao.adicionar(ponto);
      regiao.remover(ponto);

      expect(regiao.getQuantidadePontos()).toBe(0);
    });

    it('deve tratar a hierarquia completa Estado > Cidade > Ponto uniformemente', () => {
      const brasil = new LocalizacaoComposita('Brasil', 'estado');
      const minas = new LocalizacaoComposita('Minas Gerais', 'estado');
      const sul = new LocalizacaoComposita('Sul de Minas', 'regiao');

      sul.adicionar(new LocalizacaoFolha('Serra da Canastra'));
      sul.adicionar(new LocalizacaoFolha('Cachoeira do Campo'));
      minas.adicionar(sul);
      brasil.adicionar(minas);

      expect(brasil.getQuantidadePontos()).toBe(2);
      expect(minas.getQuantidadePontos()).toBe(2);
      expect(sul.getQuantidadePontos()).toBe(2);
    });
  });
});
