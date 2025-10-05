import { NextRequest, NextResponse } from 'next/server';
import { tickets } from '../../../../lib/db';
import { Ticket } from '../../../../models/ticket';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ticket = tickets.find(t => t.id === params.id);
  if (!ticket) return NextResponse.json({ error: { code: 'NOT_FOUND', field: 'id', message: 'Ticket not found' } }, { status: 404 });
  return NextResponse.json(ticket);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const ticket = tickets.find(t => t.id === params.id);
  if (!ticket) return NextResponse.json({ error: { code: 'NOT_FOUND', field: 'id', message: 'Ticket not found' } }, { status: 404 });
  const { title, description, priority, status, assignedTo, version } = await req.json();
  if (version !== ticket.version) return NextResponse.json({ error: { code: 'STALE_PATCH', message: 'Stale PATCH' } }, { status: 409 });
  if (title) ticket.title = title;
  if (description) ticket.description = description;
  if (priority) ticket.priority = priority;
  if (status) ticket.status = status;
  if (assignedTo) ticket.assignedTo = assignedTo;
  ticket.version++;
  ticket.updatedAt = new Date().toISOString();
  ticket.timeline.push({ id: Date.now().toString(), ticketId: ticket.id, type: 'update', message: 'Ticket updated', createdAt: ticket.updatedAt });
  return NextResponse.json(ticket);
}
