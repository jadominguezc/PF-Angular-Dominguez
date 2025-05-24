import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassState } from './class.state';

export const selectClassState = createFeatureSelector<ClassState>('classes');

export const selectAllClasses = createSelector(
  selectClassState,
  (state: ClassState) => state.classes
);

export const selectLoading = createSelector(
  selectClassState,
  (state: ClassState) => state.loading
);

export const selectError = createSelector(
  selectClassState,
  (state: ClassState) => state.error
);