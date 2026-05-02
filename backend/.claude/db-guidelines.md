# Database & Prisma Guidelines

## Princípios Gerais
- **Prisma como Detalhe:** O banco de dados é um detalhe de infraestrutura. Nenhuma camada acima de `Infrastructure` deve saber da existência do Prisma ou do modelo de dados do banco.
- **Single Source of Truth:** O `schema.prisma` deve refletir as necessidades das entidades de domínio, e não o contrário.

## Autenticação & Supabase
- **Provedor de Auth:** Utilizamos **Supabase Auth** (gerenciado) para autenticação de usuários.
- **Relação com Prisma:** O `Usuario.supabaseId` (UUID) é a única FK que conecta Supabase Auth com Prisma.
- **Fluxo:**
  1. Supabase Auth gerencia: login, MFA, password reset, social providers
  2. Prisma armazena: dados do usuário (nome, whatsApp, tipo/RBAC, timestamps)
  3. Após autenticação Supabase, sincronizar dados locais via `supabaseId`
- **Regra:** Nunca armazene senhas em Prisma. Supabase é a única fonte de verdade para credenciais.

## Regras de Implementação
1. **Mappers Obrigatórios**:
   - Todo repositório deve converter `Prisma Models` para `Domain Entities` antes de retorná-los.
   - Use métodos estáticos como `toDomain()` e `toPersistence()` para clareza.
2. **Consultas Eficientes**:
   - Evite `include` profundos. Prefira buscar dados específicos para evitar problemas de performance (N+1).
   - Use `select` quando precisar de apenas alguns campos.
3. **Repositórios**:
   - Devem estender uma interface definida em `src/domain/repositories/`.
   - Injetar o `PrismaService` apenas no construtor da implementação na camada de infra.

## Migrations & Schema
- **Nomeação**: Migrations devem ter nomes descritivos em snake_case (ex: `20231027_create_orders_table`).
- **Enums**: Prefira Enums do Prisma para status fixos, mas garanta que o Domínio tenha seu próprio Enum correspondente.
- **Indices**: Adicione índices em campos de busca frequente (`@index` ou `@unique`).

## O que NÃO fazer
- Importar `@prisma/client` em Use Cases ou Entidades.
- Realizar lógica de negócio dentro de queries complexas do Prisma.
- Ignorar o `npx prisma generate` após mudanças no schema.