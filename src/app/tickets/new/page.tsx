"use client";
import { useState } from 'react';

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': Date.now().toString(),
      },
      body: JSON.stringify({ title, description, priority }),
    });
    const data = await res.json();
    if (data.error) setMessage(data.error.message);
    else setMessage('Ticket created!');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 w-full">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
}
