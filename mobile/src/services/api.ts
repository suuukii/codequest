import { Session } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3333/api';

async function request<T>(path: string, body: object): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique a URL da API.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? 'Ocorreu um erro inesperado.');
  return data as T;
}

export const authApi = {
  register: (name: string, nickname: string, password: string) =>
    request<Session>('/auth/register', { name, nickname, password }),
  login: (login: string, password: string) =>
    request<Session>('/auth/login', { login, password }),
};
