import { createAction, props } from '@ngrx/store';
import { Course } from 'app/core/models/course.model';

export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Omit<Course, 'id'> }>()
);
export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ course: Course }>()
);
export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: any }>()
);

export const editCourse = createAction(
  '[Courses] Edit Course',
  props<{ course: Course }>()
);
export const editCourseSuccess = createAction(
  '[Courses] Edit Course Success',
  props<{ course: Course }>()
);
export const editCourseFailure = createAction(
  '[Courses] Edit Course Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: string }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: string }>()
);
export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>()
);