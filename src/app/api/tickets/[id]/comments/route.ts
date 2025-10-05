import { NextRequest, NextResponse } from 'next/server';
import { tickets } from '../../../../../lib/db';
import { Comment } from '../../../../../models/ticket';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ticket = tickets.find(t => t.id === params.id);
  if (!ticket) return NextResponse.json({ error: { code: 'NOT_FOUND', field: 'id', message: 'Ticket not found' } }, { status: 404 });
  const { userId, text } = await req.json();
  if (!userId) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'userId', message: 'User ID required' } }, { status: 400 });
  if (!text) return NextResponse.json({ error: { code: 'FIELD_REQUIRED', field: 'text', message: 'Comment text required' } }, { status: 400 });
  const comment: Comment = { id: uuidv4(), ticketId: ticket.id, userId, text, createdAt: new Date().toISOString() };
  ticket.comments.push(comment);
  ticket.timeline.push({ id: Date.now().toString(), ticketId: ticket.id, type: 'comment', message: `Comment added by ${userId}`, createdAt: comment.createdAt });
  return NextResponse.json(comment);
}
