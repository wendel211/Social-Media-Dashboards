import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextApiRequest } from 'next';

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key';

// Aqui a senha '1234' está corretamente criptografada
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 10), // hash da senha
    name: 'Admin',
  },
];

export function authenticateUser(email: string, password: string) {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) return null;

  const isValid = bcrypt.compareSync(password, user.password);
  return isValid ? { id: user.id, email: user.email, name: user.name } : null;
}

export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyTokenFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
