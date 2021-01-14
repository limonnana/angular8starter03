import { Role } from './role';

export class User {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  role: Role;
  password: string;
  retypePassword: string;
  token: string;
  
}
