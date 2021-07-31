import { User } from './user.schema';

export interface AllUsers {
  total: number;
  users: User[];
}
