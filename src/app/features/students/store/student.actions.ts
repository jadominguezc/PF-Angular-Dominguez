import { createAction, props } from '@ngrx/store';
import { Student } from 'app/core/models/student.model';

export const loadStudents = createAction('[Student] Load Students');
export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: Student[] }>()
);
export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: any }>()
);

export const addStudent = createAction(
  '[Student] Add Student',
  props<{ student: Omit<Student, 'id'> }>()
);
export const addStudentSuccess = createAction(
  '[Student] Add Student Success',
  props<{ student: Student }>()
);
export const addStudentFailure = createAction(
  '[Student] Add Student Failure',
  props<{ error: any }>()
);

export const editStudent = createAction(
  '[Student] Edit Student',
  props<{ student: Student }>()
);
export const editStudentSuccess = createAction(
  '[Student] Edit Student Success',
  props<{ student: Student }>()
);
export const editStudentFailure = createAction(
  '[Student] Edit Student Failure',
  props<{ error: any }>()
);

export const deleteStudent = createAction(
  '[Student] Delete Student',
  props<{ id: string }>()
);
export const deleteStudentSuccess = createAction(
  '[Student] Delete Student Success',
  props<{ id: string }>()
);
export const deleteStudentFailure = createAction(
  '[Student] Delete Student Failure',
  props<{ error: any }>()
);