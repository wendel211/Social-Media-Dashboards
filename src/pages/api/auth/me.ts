import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyTokenFromRequest } from '../../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = verifyTokenFromRequest(req);
  if (!user) return res.status(401).json({ message: 'Não autenticado' });
  res.status(200).json({ user });
}
