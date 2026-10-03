import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { authRouter } from './modules/auth/auth.routes.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/auth', authRouter);

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: error.issues[0]?.message ?? 'Dados inválidos.' });
  }
  if (error instanceof Error && error.message === 'NICKNAME_TAKEN') {
    return response.status(409).json({ message: 'Este nickname já está em uso.' });
  }
  if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
    return response.status(401).json({ message: 'Credenciais inválidas.' });
  }
  console.error(error);
  return response.status(500).json({ message: 'Não foi possível concluir a operação.' });
});
