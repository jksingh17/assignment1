import Link from 'next/link';
import { tickets } from '../../lib/db';

export default function TicketsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <Link href="/tickets/new" className="bg-blue-500 text-white px-4 py-2 rounded">New Ticket</Link>
      <ul className="mt-6">
        {tickets.map(ticket => (
          <li key={ticket.id} className="border p-4 mb-2">
            <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
            <div>Status: {ticket.status}</div>
            <div>Priority: {ticket.priority}</div>
            <div>SLA Deadline: {ticket.slaDeadline}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
