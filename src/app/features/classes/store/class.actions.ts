import { createAction, props } from '@ngrx/store';
import { Class } from 'app/core/models/class.model';

export const loadClasses = createAction('[Classes] Load Classes');
export const loadClassesSuccess = createAction(
  '[Classes] Load Classes Success',
  props<{ classes: Class[] }>()
);
export const loadClassesFailure = createAction(
  '[Classes] Load Classes Failure',
  props<{ error: any }>()
);

export const addClass = createAction(
  '[Classes] Add Class',
  props<{ classData: Omit<Class, 'id'> }>()
);
export const addClassSuccess = createAction(
  '[Classes] Add Class Success',
  props<{ classData: Class }>()
);
export const addClassFailure = createAction(
  '[Classes] Add Class Failure',
  props<{ error: any }>()
);

export const editClass = createAction(
  '[Classes] Edit Class',
  props<{ classData: Class }>()
);
export const editClassSuccess = createAction(
  '[Classes] Edit Class Success',
  props<{ classData: Class }>()
);
export const editClassFailure = createAction(
  '[Classes] Edit Class Failure',
  props<{ error: any }>()
);

export const deleteClass = createAction(
  '[Classes] Delete Class',
  props<{ id: string }>()
);
export const deleteClassSuccess = createAction(
  '[Classes] Delete Class Success',
  props<{ id: string }>()
);
export const deleteClassFailure = createAction(
  '[Classes] Delete Class Failure',
  props<{ error: any }>()
);