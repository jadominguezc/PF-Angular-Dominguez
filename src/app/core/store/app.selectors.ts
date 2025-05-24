import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { RootState } from './root-state';

export const selectAppState = (state: RootState) => state.app;

export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectAppState,
  (state: AppState) => !!state.user
);

export const selectUserRole = createSelector(
  selectAppState,
  (state: AppState) => (state.user ? state.user.role : null)
);

export const selectUsername = createSelector(
  selectAppState,
  (state: AppState) => (state.user ? state.user.username : null)
);

export const selectToolbarTitle = createSelector(
  selectAppState,
  (state: AppState) => state.toolbarTitle
);