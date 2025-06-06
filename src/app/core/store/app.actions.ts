import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const setToolbarTitle = createAction(
  '[Toolbar] Set Title',
  props<{ title: string }>()
);