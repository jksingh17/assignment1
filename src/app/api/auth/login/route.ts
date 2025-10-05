import { NextRequest, NextResponse } from 'next/server';
import { authenticate, generateToken } from '../../../../utils/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'email', message: 'Email is required' } }, { status: 400 });
  if (!password) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'password', message: 'Password is required' } }, { status: 400 });
  const user = authenticate(email, password);
  if (!user) return NextResponse.json({ error: { code: 'INVALID_CREDENTIALS', field: 'email', message: 'Invalid credentials' } }, { status: 401 });
  const token = generateToken(user);
  return NextResponse.json({ token, user: { id: user.id, email: user.email, role: user.role } });
}
