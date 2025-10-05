import type { NextRequest } from 'next/server';
const userRequests: Record<string, { count: number; timestamp: number }> = {};

export function rateLimit(req: NextRequest): boolean {
  const user = req.headers.get('authorization') || req.ip || 'anonymous';
  const now = Date.now();
  if (!userRequests[user] || now - userRequests[user].timestamp > 60000) {
    userRequests[user] = { count: 1, timestamp: now };
    return false;
  }
  userRequests[user].count++;
  if (userRequests[user].count > 60) {
    return true;
  }
  return false;
}
