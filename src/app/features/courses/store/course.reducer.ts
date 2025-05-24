import { createReducer, on } from '@ngrx/store';
import { CourseState, initialState } from './course.state';
import {
  loadCourses, loadCoursesSuccess, loadCoursesFailure,
  addCourse, addCourseSuccess, addCourseFailure,
  editCourse, editCourseSuccess, editCourseFailure,
  deleteCourse, deleteCourseSuccess, deleteCourseFailure
} from './course.actions';

export const courseReducer = createReducer(
  initialState,
  on(loadCourses, state => ({ ...state, loading: true, error: null })),
  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),
  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(addCourse, state => ({ ...state, loading: true, error: null })),
  on(addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false,
    error: null
  })),
  on(addCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(editCourse, state => ({ ...state, loading: true, error: null })),
  on(editCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map(c => (c.id === course.id ? course : c)),
    loading: false,
    error: null
  })),
  on(editCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteCourse, state => ({ ...state, loading: true, error: null })),
  on(deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(c => c.id !== id),
    loading: false,
    error: null
  })),
  on(deleteCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);