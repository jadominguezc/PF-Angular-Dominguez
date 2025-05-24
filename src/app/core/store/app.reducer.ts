import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { login, logout, setToolbarTitle } from './app.actions';

export const initialState: AppState = {
  user: null,
  toolbarTitle: 'Inicio'
};

export const appReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({
    ...state,
    user
  })),
  on(logout, (state) => ({
    ...state,
    user: null
  })),
  on(setToolbarTitle, (state, { title }) => ({
    ...state,
    toolbarTitle: title
  }))
);