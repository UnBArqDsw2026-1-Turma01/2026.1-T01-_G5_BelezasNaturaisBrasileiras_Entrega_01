# Backend — BelezasNaturaisBrasileiras

## Stack
- **Runtime/Framework:** Node.js · TypeScript · NestJS 11
- **ORM:** Prisma 7 (cliente gerado em `src/generated/prisma/`)
- **Banco:** PostgreSQL 15 (Docker local) · Supabase Auth (produção)
- **Auth:** Passport JWT (`JwtAuthGuard` + `RolesGuard` + `@Roles()`)

## Regras de Negócio
Consulte `../docs/` antes de iniciar qualquer tarefa — é o nosso Single Source of Truth.

---

## Estrutura de Pastas

O projeto usa **módulos verticais** dentro de `src/modules/<modulo>/`:

```
src/
├── modules/
│   └── accounts/
│       ├── domain/          # Entidades, interfaces, enums — ZERO dependências externas
│       │   ├── entities/    # User.ts (implementa IPrototype — padrão Prototype)
│       │   ├── builders/    # UserBuilder.ts (padrão Builder)
│       │   └── interfaces/  # IUserRepository, IUserFactory, IUserFactoryRegistry, ISupabaseAuthService
│       ├── application/     # Use Cases e DTOs
│       │   ├── use-cases/   # CreateAccountUseCase, PromoteUserUseCase
│       │   └── dtos/        # CreateAccountInput/Output, PromoteUserInput/Output
│       ├── infrastructure/  # Implementações concretas (Prisma, Supabase, Factories)
│       │   ├── factories/   # AdminUserFactory, CommonUserFactory, OrganizerUserFactory, UserFactoryRegistry
│       │   ├── mappers/     # UserMapper (toDomain / toPersistence)
│       │   ├── persistence/ # PrismaUserRepository
│       │   └── services/    # SupabaseAuthService
│       ├── interface/       # Controllers NestJS e providers de injeção
│       │   ├── controllers/ # AccountController
│       │   └── providers/   # UserFactoryProvider
│       └── auth/            # Guards, strategies, decorators, enums
│           ├── guards/      # JwtAuthGuard, RolesGuard
│           ├── strategies/  # jwt.strategy.ts
│           ├── decorators/  # @Roles()
│           └── enums/       # role.enum.ts
└── shared/
    └── infrastructure/
        ├── prisma/          # PrismaService
        └── supabase/        # supabase.provider.ts
```

---

## Padrões GoF Implementados

| Padrão | Onde | Descrição |
|---|---|---|
| **Builder** | `domain/builders/UserBuilder.ts` | Construção fluente de `User` com validação |
| **Factory** | `infrastructure/factories/` | `AdminUserFactory`, `CommonUserFactory`, `OrganizerUserFactory` — cada role tem sua própria factory |
| **Factory Registry** | `infrastructure/factories/UserFactoryRegistry.ts` | Mapeia `UserRole → IUserFactory`; use `registry.get(role).create(...)` |
| **Prototype** | `domain/entities/User.ts` | `User.clone(overrides?)` para criar cópias com campos alterados |

---

## Regras de Arquitetura

- **Nunca** importe `infrastructure` ou `interface` dentro de `domain` ou `application`.
- **Nunca** importe `@prisma/client` fora de `infrastructure/`.
- Use `UserMapper.toDomain()` e `UserMapper.toPersistence()` — o Prisma nunca chega ao domínio.
- Use Cases dependem de **interfaces** (`IUserRepository`), nunca de classes concretas.
- Repositórios ficam em `infrastructure/persistence/` e implementam interfaces de `domain/interfaces/`.
- Controllers **apenas** delegam ao Use Case e tratam o retorno HTTP.

### Autenticação
- Senhas nunca entram no Prisma — Supabase Auth é a única fonte de verdade para credenciais.
- O `User.id` no Prisma **é** o `supabaseId` (UUID gerado pelo Supabase).
- Rotas protegidas usam `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles(Role.ADMIN)`.

---

## Comandos

```bash
# Desenvolvimento
npm run start:dev          # Inicia o servidor

# Qualidade (rode antes de abrir PR)
npm run lint               # ESLint + Prettier --fix
npm run test               # Jest (unit tests)
npm run test:cov           # Cobertura de testes

# Prisma
npm run prisma:generate    # Regenera o cliente após mudança no schema
npm run prisma:migrate:dev # Cria e aplica migration em dev
npm run prisma:studio      # Abre Prisma Studio (UI do banco)

# Build
npm run build
```

---

## Setup Local (Docker)

> Troubleshooting detalhado em `.claude/docker-setup.md`.

```bash
cp .env.example .env.local   # Copiar variáveis de ambiente
docker-compose up -d         # Subir PostgreSQL + pgAdmin
```

- **pgAdmin:** `http://localhost:5050` (credenciais em `.env.local`)
- **Conectar ao banco no pgAdmin:** host `postgres`, porta `5432`
- `docker-compose down` preserva dados · `docker-compose down -v` apaga tudo

---

## Referência Rápida (leia sob demanda)

| Preciso de... | Arquivo |
|---|---|
| Camadas e responsabilidades | `.claude/arch.md` |
| Mappers, DTOs, inversão de dependência | `.claude/code-style.md` |
| Prisma, migrations, Supabase | `.claude/db-guidelines.md` |
| Testes unitários (AAA, mocks, localização) | `.claude/testing.md` |
| Checklist de revisão antes de finalizar | `.claude/review-checklist.md` |
