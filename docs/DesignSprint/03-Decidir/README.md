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
A definição do escopo atual foi fruto de intensos debates e pivotagens durante a etapa de decisão. Inicialmente, a equipe cogitou construir um blog estático de atrações naturais brasileiras, avaliando o formato de conteúdo de sites como o [Melhores Destinos](https://www.melhoresdestinos.com.br/) e o catálogo de divulgação do [Visit Brasil](https://visitbrasil.com/). No entanto, a ideia foi descartada por ser considerada muito simples e de baixa utilidade prática para o usuário final. 

Em seguida, exploramos a possibilidade de desenvolver um sistema de trilhas focado em geolocalização em tempo real e mapeamento, inspirados nas funcionalidades de plataformas como o [Wikiloc](https://pt.wikiloc.com/) e na gestão oficial do [eTrilhas](https://etrilhas.com.br/). Essa segunda ideia também foi abandonada, pois percebemos que a complexidade técnica fugiria drasticamente do escopo acadêmico da disciplina de Arquitetura de Software.

Por fim, convergimos para a ideia atual, que foi fortemente inspirada em uma demanda real passada por alguns colegas da equipe: um cliente que gerenciava uma agência de trilhas no cerrado chamada **GuaraTrip** e precisava de um sistema para organizar seus eventos. Decidimos utilizar as necessidades reais desse cliente como inspiração, mas adaptando o projeto para um escopo não lucrativo, colaborativo e de alcance nacional. 

### Desafios e Discussões
Durante o processo de decisão para fechar esse escopo, enfrentamos dilemas importantes:
1. **Autenticação Segura e Validação Física:** Discutimos exaustivamente como garantir a segurança dos usuários em encontros presenciais. A solução encontrada foi a exigência de documentos (RG/CPF) para o upgrade de Organizador e a criação de um código de presença gerado pelo sistema.
2. **Dilema da Monetização:** Houve um debate sobre a monetização futura da plataforma e a venda de pacotes de ecoturismo, modelo adotado por empresas como o [Desviantes](https://desviantes.com.br/). Decidimos que, para o escopo do projeto, o sistema se manterá estritamente focado no valor gerado pela comunidade, com avisos expressos contra pagamentos antecipados na plataforma.
3. **Retroalimentação do Blog:** Para resolver o problema de o sistema se tornar um "blog morto", adotamos a estratégia de retroalimentação. A própria comunidade de usuários comuns será responsável por cadastrar e editar os pontos turísticos, com o sistema garantindo a integridade através de um histórico de versionamento de edições.

Com esses pontos definidos, conseguimos bater o martelo nas soluções e derivar todos os requisitos que se encontram devidamente formalizados no **Módulo 1.1**.

---

## Escopo do que será prototipado (MVP)

A partir das decisões da equipe, o escopo foi refinado para garantir a cobertura completa das telas, fluxos funcionais, estados do sistema e regras de negócio críticas. O mapeamento abaixo detalha as interfaces que compõem o Produto Mínimo Viável:

### 1. Navegação Pública e Visão de Visitantes
* **Feed Principal e Listagens:** Tela inicial com filtros hierárquicos manuais (Estado > Cidade > Região) e listagem de cards de pontos turísticos. Inclui também uma tela dedicada para exploração e filtro geral de trilhas abertas.
* **Página do Ponto Turístico:** Interface contendo os detalhes do local, fotos, comentários, opção de denúncia e a lista de cards das trilhas associadas àquela região.
* **Página Detalhada da Trilha:** Tela exibindo o percurso, data, horário, ponto de encontro, locais de passagem e o botão principal "Inscreva-se". Deve conter indicadores visuais apontando o status do evento (ativa, cheia, encerrada).
* **Perfil Público do Organizador:** Página individual exibindo o histórico de trilhas criadas (ativas e inativas), avaliações gerais recebidas, histórico de comentários e opção de denúncia do perfil.

### 2. Acesso, Conta e Área do Usuário Comum
* **Telas de Autenticação:** Interfaces padronizadas de Login (e-mail/senha ou integração Google), Cadastro de conta e Recuperação de senha.
* **Painel Pessoal (Meu Perfil):** Espaço para edição de dados básicos (foto, nome), visualização da galeria de badges conquistadas e acesso detalhado aos códigos de confirmação gerados.
* **Minhas Trilhas:** Painel de acompanhamento listando o status das inscrições do usuário (pendente, confirmado, recusado) e o histórico de participações passadas.
* **Fluxo de Adição de Ponto Turístico:** Formulário que permite submeter as informações dos pontos turísticos a serem cadastrados.
* **Edição e Histórico de Locais:** Telas para a edição de pontos turísticos já existentes, incluindo a visualização da tabela com o histórico de alterações (quem alterou e quando).
* **Módulo de Mensagens (Chat 1-para-1):** Interface dividida entre a caixa de entrada (lista de conversas) e a tela de chat individual com o organizador. O chat contém o aviso fixo de segurança contra pagamentos e o módulo para avaliar o organizador logo no início do contato.
* **Telas de Solicitação e Moderação:** Formulário de solicitação de *upgrade* para Organizador (envio de RG, CPF, justificativa) com exibição de status da aprovação, e modais globais para envio de denúncias (locais, perfis ou comentários).

### 3. Painel de Gestão do Organizador
* **Dashboard do Organizador:** Painel de controle com a visão geral das trilhas sob sua gestão, separadas por abas de ativas e inativas.
* **Criador de Eventos (Trilhas):** Formulário abrangente de criação e edição de rotas. Inclui a funcionalidade de *popup* para o cadastro rápido de locais sem a necessidade de interromper o fluxo de criação da trilha.
* **Gestão de Inscrições:** Interface para visualização de solicitações de participação pendentes. Permite abrir o perfil dos solicitantes, aceitar ou recusar pedidos de vaga e acessar rapidamente os chats individuais.
* **Painel de Execução e Encerramento (Check-in):** Tela operacional de uso em campo, contendo a lista de participantes confirmados, o campo para validação de presença via código único e o botão "Finalizar Trilha", que inativa o evento e aciona a distribuição automática das badges.

### 4. Área de Administração (Backoffice)
* **Dashboard de Usuários (Upgrades):** Fila administrativa de solicitações pendentes, permitindo a checagem de documentos enviados para promoção manual a Organizador ou Administrador.
* **Central de Moderação:** Interface de listagem de denúncias recebidas pela comunidade, fornecendo ações sistêmicas para remover conteúdos impróprios, banir/bloquear usuários infratores e apagar permanentemente cadastros de locais (ação irreversível com confirmação).

### 5. Telas Sistêmicas e Estados Globais
* **Feedback Visual e Estados de Interface:** Mapeamento padronizado de modais de confirmação, mensagens de sucesso/erro via *toast* e estados de tela críticos (telas de *loading*, *empty states* para buscas sem resultados e páginas de erro 404/500).
* **Controles de Segurança:** Regras visuais de bloqueio de conteúdo para usuários não autenticados e exibição rigorosa dos alertas de segurança financeira integrados a todos os fluxos de reserva.

---

## Planilha de versionamento

| Versão | Data | Descrição | Autor | Revisor |
| ------ | ---------- | ---------------------------------------------- | ------------------------------------- | ------- |
| 1.0 | 01/04/2026 | Criação do documento e adição da estrutura base | [Ana Luiza](https://github.com/ana-pfeilsticker) | Mateus Magno |
| 1.1 | 03/04/2026 | Adição das justificativas de decisão, história de evolução do MVP e formalização do escopo | [Mateus Magno](https://github.com/mtsmgn0) | |
| 1.2 | 03/04/2026 | Inclusão de referências de mercado (concorrentes e inspirações) no texto de Evolução e Desafios | [Mateus Magno](https://github.com/mtsmgn0) | |
