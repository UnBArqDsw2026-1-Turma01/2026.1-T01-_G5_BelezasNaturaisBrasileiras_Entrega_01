# Etapa 3 - Decidir

A etapa **Decidir** seleciona as ideias com maior potencial. O time avalia as propostas, discute critérios e define o caminho que será prototipado.

## Objetivo

Tomar decisões claras sobre a solução que avançará para prototipação.

## Atividades da etapa

- apresentação dos esboços
- votação estruturada das alternativas
- análise de viabilidade e impacto
- definição da proposta final

---

## Registro da Decisão da Equipe

### A Evolução da Ideia
A definição do escopo atual foi fruto de intensos debates e pivotagens durante a etapa de decisão. Inicialmente, a equipe cogitou construir um blog estático de atrações naturais brasileiras. No entanto, a ideia foi descartada por ser considerada muito simples e de baixa utilidade prática para o usuário final. 

Em seguida, exploramos a possibilidade de desenvolver um sistema de trilhas focado em geolocalização em tempo real e integração profunda com mapas. Essa segunda ideia também foi abandonada, pois percebemos que a complexidade técnica fugiria drasticamente do escopo acadêmico da disciplina de Arquitetura de Software.

Por fim, convergimos para a ideia atual, que foi fortemente inspirada em uma demanda real passada por alguns colegas da equipe: um cliente que gerenciava uma agência de trilhas no cerrado chamada **GuaraTrip** e precisava de um sistema para organizar seus eventos. Decidimos utilizar as necessidades reais desse cliente como inspiração, mas adaptando o projeto para um escopo não lucrativo, colaborativo e de alcance nacional. 

### Desafios e Discussões
Durante o processo de decisão para fechar esse escopo, enfrentamos dilemas importantes:
1. **Autenticação Segura e Validação Física:** Discutimos exaustivamente como garantir a segurança dos usuários em encontros presenciais. A solução encontrada foi a exigência de documentos (RG/CPF) para o upgrade de Organizador e a criação de um código de presença gerado pelo sistema.
2. **Dilema da Monetização:** Houve um debate sobre a monetização futura da plataforma. Decidimos que, para o escopo do projeto, o sistema se manterá estritamente focado no valor gerado pela comunidade, com avisos expressos contra pagamentos antecipados na plataforma.
3. **Retroalimentação do Blog:** Para resolver o problema de o sistema se tornar um "blog morto", adotamos a estratégia de retroalimentação. A própria comunidade de usuários comuns será responsável por cadastrar e editar os pontos turísticos, com o sistema garantindo a integridade através de um histórico de versionamento de edições.

Com esses pontos definidos, conseguimos bater o martelo nas soluções e derivar todos os requisitos que se encontram devidamente formalizados no **Módulo 1.1**.

---

## Escopo do que será prototipado (MVP)

A partir das decisões acima, o status atual do projeto reflete a definição de um **Produto Mínimo Viável (MVP)**, estabelecendo as bases funcionais do sistema, sem ser um plano imutável. O escopo definido abrange as seguintes frentes:

**1. Acesso de Visitantes (Usuários Não Logados)**
A plataforma apresenta um feed de belezas naturais com navegação manual hierárquica (Estado > Cidade > Região). O visitante pode visualizar detalhes do local, fotos, comentários e uma lista de cards de trilhas vinculadas. É possível visualizar a página detalhada da trilha (percurso, data, hora, ponto de encontro) e o perfil público do organizador.

**2. Cadastro e Usuários Comuns**
A interação completa exige criação de conta (dados básicos ou login via Google). O usuário logado recebe permissão para cadastrar e editar pontos turísticos (com registro de histórico de edição no sistema), além de comentar, denunciar e personalizar seu perfil. O usuário também ganha acesso ao formulário de solicitação de upgrade para "Organizador", que exige envio de RG, CPF e justificativa.

**3. Dinâmica de Inscrição em Trilhas**
A inscrição ocorre por meio de um botão que abre um chat estritamente individual (1-para-1) com o organizador, exibindo alertas de segurança contra fraudes. O usuário pode avaliar o organizador logo no início do contato. Caso o organizador aceite o pedido no chat, o sistema gera e disponibiliza um código de confirmação no menu do usuário.

**4. Perfil e Funcionalidades do Organizador**
O Organizador possui permissões elevadas para criar trilhas, definir pontos de encontro e gerenciar as rotas. Ele gerencia as inscrições através do chat individual e valida a presença física dos membros inserindo os códigos de confirmação. Ao concluir o evento, o organizador utiliza a função "Finalizar Trilha", que inativa o evento e distribui as badges automaticamente para os usuários validados. Trilhas inativas podem ser reativadas mediante alteração da data.

**5. Painel do Administrador**
O Administrador detém visão total da plataforma, sendo responsável por analisar os pedidos de upgrade (promovendo usuários), visualizar o painel de denúncias, bloquear contas e realizar a exclusão permanente de cadastros de locais.

---

## Planilha de versionamento

| Versão | Data | Descrição | Autor | Revisor |
| ------ | ---------- | ---------------------------------------------- | ------------------------------------- | ------- |
| 1.0 | 01/04/2026 | Criação do documento e adição da estrutura base | [Ana Luiza](https://github.com/ana-pfeilsticker) | Mateus Magno |
| 1.1 | 03/04/2026 | Adição das justificativas de decisão, história de evolução do MVP e formalização do escopo | [Mateus Magno](https://github.com/mtsmgn0) | |
