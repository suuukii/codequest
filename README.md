# CodeQuest:

App com cadastro e login, conectado a um banco de dados no Supabase.

- `mobile/`: app em Expo + React Native (telas de login e cadastro)
- `backend/`: API em Express + TypeScript (cadastro, login e token JWT)
- `database/`: SQL para criar a tabela `users`

## Requisitos

- Node.js (versão LTS)
- Uma conta no [Supabase](https://supabase.com) com um projeto criado
- Para testar no celular: app **Expo Go para o SDK 51** (a versão da loja é mais nova e não abre este projeto; instale a versão compatível em https://expo.dev/go)

## 1. Banco de dados

1. No painel do Supabase, abra o **SQL Editor**.
2. Rode o conteúdo de `database/init.sql`.
3. Em **Table Editor**, confira que a tabela `users` foi criada e que o rótulo "Unrestricted" não aparece.

## 2. API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Preencha o `backend/.env`:

| Variável | O que é |
| --- | --- |
| `PORT` | Porta da API (padrão `3333`) |
| `SUPABASE_URL` | URL do projeto, no painel do Supabase |
| `SUPABASE_KEY` | Chave **secret** do projeto (nunca use a publishable aqui) |
| `JWT_SECRET` | Frase longa e aleatória que assina os tokens |

Confira se a API subiu abrindo `http://localhost:3333/health`. Deve responder `{"status":"ok"}`.

## 3. App

```bash
cd mobile
cp .env.example .env
npm install
npx expo start -c
```

Preencha o `mobile/.env` com a URL da API, conforme onde você testa:

| Onde | `EXPO_PUBLIC_API_URL` |
| --- | --- |
| Navegador | `http://localhost:3333/api` |
| Emulador Android | `http://10.0.2.2:3333/api` |
| Celular físico (Expo Go) | `http://IP-DO-SEU-PC:3333/api` |

No celular, o aparelho e o PC precisam estar na **mesma rede Wi-Fi**. Descubra o IP do PC com `ipconfig` (campo IPv4).

Depois de mudar o `.env`, reinicie o Expo com `npx expo start -c`.

## Rotas da API

- `GET /health`
- `POST /api/auth/register` com `name`, `nickname` e `password` (mínimo 8 caracteres)
- `POST /api/auth/login` com `login` (nickname) e `password`

## Observações

- O login funciona apenas por nickname.
- As senhas são guardadas com hash (bcrypt).
- Nunca faça commit dos arquivos `.env`. Use os `.env.example` como modelo.
