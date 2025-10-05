export type Role = 'user' | 'agent' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
}
