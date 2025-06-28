import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser, generateToken } from '../../lib/auth';
import * as cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  console.log('🔐 Tentativa de login');
  console.log('📧 Email recebido:', email);
  // console.log('🔑 Senha recebida:', password); // Avoid logging sensitive information

  const user = await authenticateUser(email, password);
  console.log('👤 Resultado da autenticação:', user);

  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = generateToken(user);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    })
  );

  res.status(200).json({ user });
}
