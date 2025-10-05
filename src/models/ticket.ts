export type TicketStatus = 'open' | 'closed' | 'breached';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: TicketStatus;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  version: number;
  comments: Comment[];
  timeline: TimelineEvent[];
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  ticketId: string;
  type: string;
  message: string;
  createdAt: string;
}
