import { createReducer, on } from '@ngrx/store';
import { Student } from 'app/core/models/student.model';
import * as StudentActions from './student.actions';

export interface StudentState {
  students: Student[];
  error: any;
  loading: boolean;
}

export const initialState: StudentState = {
  students: [],
  error: null,
  loading: false
};

export const studentReducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
    error: null
  })),
  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StudentActions.addStudent, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
    loading: false,
    error: null
  })),
  on(StudentActions.addStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StudentActions.editStudent, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.editStudentSuccess, (state, { student }) => ({
    ...state,
    students: state.students.map(s => (s.id === student.id ? student : s)),
    loading: false,
    error: null
  })),
  on(StudentActions.editStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StudentActions.deleteStudent, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter(s => s.id !== id),
    loading: false,
    error: null
  })),
  on(StudentActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);