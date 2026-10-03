# API CodeQuest

## Rotas

| Método | Rota | Corpo |
| --- | --- | --- |
| `POST` | `/api/auth/register` | `{ name, nickname, password }` |
| `POST` | `/api/auth/login` | `{ login, password }` |
| `GET` | `/health` | — |

As duas rotas de autenticação retornam `{ user, token }`. O token expira em sete dias.

## Segurança incluída

- Senhas protegidas com `bcrypt` (12 rounds).
- Validação de entrada feita com Zod.
- Consultas parametrizadas ao PostgreSQL.
- `nickname` único, normalizado para minúsculas.
