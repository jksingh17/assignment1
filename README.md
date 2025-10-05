
# HelpDesk Mini

A ticketing system with SLA timers, assignments, threaded comments, searchable timeline, and role-based access.

## API Summary

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Tickets
- `POST /api/tickets` — Create ticket (idempotent, requires Idempotency-Key)
- `GET /api/tickets?limit=&offset=&search=` — List tickets (pagination, search)
- `GET /api/tickets/:id` — Get ticket details
- `PATCH /api/tickets/:id` — Update ticket (optimistic locking)
- `POST /api/tickets/:id/comments` — Add comment to ticket

### Other Features
- SLA deadlines, breached tickets, timeline logs, RBAC, open CORS, rate limiting (60 req/min/user)

## Example Requests & Responses

### Register
```http
POST /api/auth/register
{
	"email": "user1@example.com",
	"password": "password123",
	"role": "user"
}
```

### Login
```http
POST /api/auth/login
{
	"email": "user1@example.com",
	"password": "password123"
}
```

### Create Ticket
```http
POST /api/tickets
Headers: Idempotency-Key: abc123
{
	"title": "Cannot login",
	"description": "Login fails with error.",
	"priority": "high"
}
```

### Error Format
```json
{ "error": { "code": "FIELD_REQUIRED", "field": "email", "message": "Email is required" } }
```

### Rate Limit
```json
{ "error": { "code":"RATE_LIMIT" } }
```

## Test User Credentials
- user1@example.com / password123 (user)
- agent1@example.com / password123 (agent)
- admin1@example.com / password123 (admin)

## Seed Data
- 2 tickets (open, breached)
- 3 users (user, agent, admin)
- Sample comments

## Pages
- `/tickets` — List/search tickets
- `/tickets/new` — Create ticket
- `/tickets/:id` — Ticket details, comments, timeline

## Setup
1. `npm install`
2. `npm run dev`
3. Access at http://localhost:3000

---

See API docs for more details.
