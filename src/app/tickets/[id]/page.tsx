"use client";
import { useState } from 'react';
import { tickets, users } from '../../../lib/db';

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find(t => t.id === params.id);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  if (!ticket) return <div>Ticket not found</div>;

  async function handleComment(e: any) {
    e.preventDefault();
    const res = await fetch(`/api/tickets/${ticket.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: ticket.createdBy, text: comment }),
    });
    const data = await res.json();
    if (data.error) setMessage(data.error.message);
    else setMessage('Comment added!');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <div>Description: {ticket.description}</div>
      <div>Status: {ticket.status}</div>
      <div>Priority: {ticket.priority}</div>
      <div>SLA Deadline: {ticket.slaDeadline}</div>
      <div className="mt-4">
        <h2 className="font-bold">Comments</h2>
        <ul>
          {ticket.comments.map(c => (
            <li key={c.id} className="border p-2 mb-2">{c.text} <span className="text-xs">by {users.find(u => u.id === c.userId)?.email}</span></li>
          ))}
        </ul>
        <form onSubmit={handleComment} className="mt-2">
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add comment" className="border p-2 w-full" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Comment</button>
        </form>
        {message && <div className="mt-2 text-red-500">{message}</div>}
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Timeline</h2>
        <ul>
          {ticket.timeline.map(ev => (
            <li key={ev.id} className="text-xs">[{ev.createdAt}] {ev.type}: {ev.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
