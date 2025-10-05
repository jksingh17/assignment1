import { User, Role } from '../models/user';
import { Ticket, Comment, TimelineEvent } from '../models/ticket';

// In-memory DB for demo
export const users: User[] = [
  { id: 'u1', email: 'user1@example.com', password: 'password123', role: 'user' },
  { id: 'a1', email: 'agent1@example.com', password: 'password123', role: 'agent' },
  { id: 'ad1', email: 'admin1@example.com', password: 'password123', role: 'admin' },
];

export const tickets: Ticket[] = [
  {
    id: 't1',
    title: 'Cannot login',
    description: 'Login fails with error.',
    priority: 'high',
    status: 'open',
    createdBy: 'u1',
    assignedTo: 'a1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slaDeadline: new Date(Date.now() + 3600 * 1000).toISOString(),
    version: 1,
    comments: [],
    timeline: [],
  },
  {
    id: 't2',
    title: 'Page not loading',
    description: 'Dashboard page is blank.',
    priority: 'medium',
    status: 'breached',
    createdBy: 'u1',
    assignedTo: 'a1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slaDeadline: new Date(Date.now() - 3600 * 1000).toISOString(),
    version: 1,
    comments: [],
    timeline: [],
  },
];
