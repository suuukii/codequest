
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { supabase } from '../../database/pool.js';

type User = { id: string; name: string; nickname: string; password_hash: string };

function publicUser(user: User) {
  return { id: user.id, name: user.name, nickname: user.nickname };
}

function tokenFor(user: User) {
  return jwt.sign({ sub: user.id, nickname: user.nickname }, env.jwtSecret, { expiresIn: '7d' });
}

export async function register(input: { name: string; nickname: string; password: string }) {
  const nickname = input.nickname.toLowerCase();

  const { data: existing, error: existingError } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .limit(1)
    .maybeSingle();
  if (existing) throw new Error('NICKNAME_TAKEN');
  if (existingError) throw existingError;

  const passwordHash = "hash";
  const { data, error } = await supabase
    .from('users')
    .insert({ name: input.name, nickname, password_hash: passwordHash })
    .select('id, name, nickname, password_hash')
    .maybeSingle();

  if (error || !data) throw error ?? new Error('INSERT_FAILED');

  const user = data as User;
  return { user: publicUser(user), token: tokenFor(user) };
}

export async function login(input: { login: string; password: string }) {
  const loginValue = input.login;

  let { data: user, error } = await supabase
    .from('users')
    .select('id, name, nickname, password_hash')
    .ilike('nickname', loginValue)
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  if (!user) {
    const res = await supabase
      .from('users')
      .select('id, name, nickname, password_hash')
      .ilike('name', loginValue)
      .limit(1)
      .maybeSingle();
    user = res.data as User | null;
    if (res.error) throw res.error;
  }

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }
  return { user: publicUser(user as User), token: tokenFor(user as User) };
}
