# CodeQuest Auth

## Estrutura

- `mobile/`: Expo + React Native.
- `backend/`: API Express em TypeScript.
- `database/init.sql`: estrutura inicial do PostgreSQL.

## Executar a API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Crie o banco e execute o conteúdo de `database/init.sql`. Ajuste o `DATABASE_URL` em
`backend/.env` se necessário.

## Executar o aplicativo

```bash
cd mobile
cp .env.example .env
npm install
npx expo start
npm run android
```

No celular físico, defina `EXPO_PUBLIC_API_URL` com o IP da sua máquina na rede local,
por exemplo `http://192.168.0.10:3333/api`.
