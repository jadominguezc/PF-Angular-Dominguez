import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectAllStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);

export const selectLoading = createSelector(
  selectStudentState,
  (state: StudentState) => state.loading
);

export const selectError = createSelector(
  selectStudentState,
  (state: StudentState) => state.error
);