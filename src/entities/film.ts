import { User } from './user';

export type Film = {
  id: string;
  director: string;
  title: string;
  owner: User;
};
