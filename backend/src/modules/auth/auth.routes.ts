import { Router } from 'express';
import { loginSchema, registerSchema } from './auth.schemas.js';
import { login, register } from './auth.service.js';

export const authRouter = Router();

authRouter.post('/register', async (request, response, next) => {
  try {
    const payload = registerSchema.parse(request.body);
    const session = await register(payload);
    response.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (request, response, next) => {
  try {
    const payload = loginSchema.parse(request.body);
    response.json(await login(payload));
  } catch (error) {
    next(error);
  }
});
