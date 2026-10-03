ximport 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`A variável de ambiente ${name} é obrigatória.`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  supabaseUrl: required('SUPABASE_URL'),
  supabaseKey: required('SUPABASE_KEY'),
  jwtSecret: required('JWT_SECRET'),
};
