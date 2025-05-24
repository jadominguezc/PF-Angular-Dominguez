export interface User {
  id: string;
  name: string;
  rut: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
}