import { NextRequest, NextResponse } from 'next/server';
import { users } from '../../../../lib/db';
import { User, Role } from '../../../../models/user';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();
  if (!email) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'email', message: 'Email is required' } }, { status: 400 });
  if (!password) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'password', message: 'Password is required' } }, { status: 400 });
  if (!role || !['user','agent','admin'].includes(role)) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'role', message: 'Role is required' } }, { status: 400 });
  if (users.find(u => u.email === email)) return NextResponse.json({ error: { code: 'EMAIL_EXISTS', field: 'email', message: 'Email already exists' } }, { status: 409 });
  const user: User = { id: uuidv4(), email, password, role };
  users.push(user);
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
