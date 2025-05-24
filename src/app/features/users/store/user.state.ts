import { User } from 'app/core/models/user.model';

export interface UserState {
  users: User[];
  error: any;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  error: null,
  loading: false
};