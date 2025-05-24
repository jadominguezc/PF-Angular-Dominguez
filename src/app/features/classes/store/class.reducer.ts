import { createReducer, on } from '@ngrx/store';
import { ClassState, initialState } from './class.state';
import {
  loadClasses, loadClassesSuccess, loadClassesFailure,
  addClass, addClassSuccess, addClassFailure,
  editClass, editClassSuccess, editClassFailure,
  deleteClass, deleteClassSuccess, deleteClassFailure
} from './class.actions';

export const classReducer = createReducer(
  initialState,
  on(loadClasses, state => ({ ...state, loading: true, error: null })),
  on(loadClassesSuccess, (state, { classes }) => ({
    ...state,
    classes,
    loading: false,
    error: null
  })),
  on(loadClassesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(addClass, state => ({ ...state, loading: true, error: null })),
  on(addClassSuccess, (state, { classData }) => ({
    ...state,
    classes: [...state.classes, classData],
    loading: false,
    error: null
  })),
  on(addClassFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(editClass, state => ({ ...state, loading: true, error: null })),
  on(editClassSuccess, (state, { classData }) => ({
    ...state,
    classes: state.classes.map(c => (c.id === classData.id ? classData : c)),
    loading: false,
    error: null
  })),
  on(editClassFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteClass, state => ({ ...state, loading: true, error: null })),
  on(deleteClassSuccess, (state, { id }) => ({
    ...state,
    classes: state.classes.filter(c => c.id !== id),
    loading: false,
    error: null
  })),
  on(deleteClassFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);