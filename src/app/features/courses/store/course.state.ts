import { Course } from 'app/core/models/course.model';

export interface CourseState {
  courses: Course[];
  error: any;
  loading: boolean;
}

export const initialState: CourseState = {
  courses: [],
  error: null,
  loading: false
};