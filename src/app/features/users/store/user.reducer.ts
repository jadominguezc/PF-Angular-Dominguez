import { createReducer, on } from '@ngrx/store';
import { UserState, initialState } from './user.state';
import {
  loadUsers, loadUsersSuccess, loadUsersFailure,
  editUser, editUserSuccess, editUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(editUser, state => ({ ...state, loading: true, error: null })),
  on(editUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
    loading: false,
    error: null
  })),
  on(editUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteUser, state => ({ ...state, loading: true, error: null })),
  on(deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id),
    loading: false,
    error: null
  })),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);