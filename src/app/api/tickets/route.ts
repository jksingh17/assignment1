import { NextRequest, NextResponse } from 'next/server';
import { tickets, users } from '../../../lib/db';
import { Ticket } from '../../../models/ticket';
import { v4 as uuidv4 } from 'uuid';
import { rateLimit } from '../../../middleware/rateLimit';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  const search = searchParams.get('search')?.toLowerCase() || '';
  let filtered = tickets.filter(t =>
    t.title.toLowerCase().includes(search) ||
    t.description.toLowerCase().includes(search) ||
    (t.comments.length > 0 && t.comments[t.comments.length-1].text.toLowerCase().includes(search))
  );
  const items = filtered.slice(offset, offset + limit);
  const next_offset = offset + items.length < filtered.length ? offset + items.length : null;
  return NextResponse.json({ items, next_offset });
}

export async function POST(req: NextRequest) {
  if (rateLimit(req)) return NextResponse.json({ error: { code: 'RATE_LIMIT' } }, { status: 429 });
  const idempotencyKey = req.headers.get('idempotency-key');
  if (!idempotencyKey) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'Idempotency-Key', message: 'Idempotency-Key required' } }, { status: 400 });
  // Simple idempotency: store keys in memory
  (global as any).idempotencyKeys = (global as any).idempotencyKeys || {};
  if ((global as any).idempotencyKeys[idempotencyKey]) {
    return NextResponse.json((global as any).idempotencyKeys[idempotencyKey]);
  }
  const { title, description, priority } = await req.json();
  if (!title) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'title', message: 'Title is required' } }, { status: 400 });
  if (!description) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'description', message: 'Description is required' } }, { status: 400 });
  const ticket: Ticket = {
    id: uuidv4(),
    title,
    description,
    priority,
    status: 'open',
    createdBy: 'u1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slaDeadline: new Date(Date.now() + 3600 * 1000).toISOString(),
    version: 1,
    comments: [],
    timeline: [],
  };
  tickets.push(ticket);
  (global as any).idempotencyKeys[idempotencyKey] = ticket;
  return NextResponse.json(ticket);
}
