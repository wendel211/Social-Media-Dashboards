// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextApiRequest } from 'next';
import { prisma } from './prisma'; // novo: importa client do Prisma

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key';

// Busca usuário real do banco de dados
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? { id: user.id, email: user.email, name: user.name } : null;
}

// Gera token JWT válido por 1h
export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// Verifica o token do cookie da requisição
export function verifyTokenFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
