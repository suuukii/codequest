import { z } from 'zod';

const nickname = z.string().trim().min(3, 'O nickname deve ter ao menos 3 caracteres.')
  .max(40).regex(/^[a-zA-Z0-9_]+$/, 'Use apenas letras, números e _.');

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(120),
  nickname,
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres.').max(72),
});

export const loginSchema = z.object({
  login: z.string().trim().min(1, 'Informe seu nome ou nickname.'),
  password: z.string().min(1, 'Informe sua senha.'),
});
