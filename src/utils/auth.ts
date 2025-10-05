import { users } from '../lib/db';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const SECRET = 'helpdesk_secret';

export function authenticate(email: string, password: string): User | null {
  return users.find(u => u.email === email && u.password === password) || null;
}

export function generateToken(user: User) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { id: string; role: string } | null {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch {
    return null;
  }
}
