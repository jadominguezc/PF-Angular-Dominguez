import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.state';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
);

export const selectError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);