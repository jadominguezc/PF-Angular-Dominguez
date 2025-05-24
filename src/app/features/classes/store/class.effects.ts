import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClassService } from '../services/class.service';
import {
  loadClasses, loadClassesSuccess, loadClassesFailure,
  addClass, addClassSuccess, addClassFailure,
  editClass, editClassSuccess, editClassFailure,
  deleteClass, deleteClassSuccess, deleteClassFailure
} from './class.actions';

@Injectable()
export class ClassEffects {
  loadClasses$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(loadClassesFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(loadClasses),
      mergeMap(() =>
        this.classService.getClasses().pipe(
          map(classes => loadClassesSuccess({ classes })),
          catchError(error => of(loadClassesFailure({ error })))
        )
      )
    );
  });

  addClass$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(addClassFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(addClass),
      mergeMap(({ classData }) =>
        this.classService.addClass(classData).pipe(
          map(newClass => addClassSuccess({ classData: newClass })),
          catchError(error => of(addClassFailure({ error })))
        )
      )
    );
  });

  editClass$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(editClassFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(editClass),
      mergeMap(({ classData }) =>
        this.classService.editClass(classData).pipe(
          map(updatedClass => editClassSuccess({ classData: updatedClass })),
          catchError(error => of(editClassFailure({ error })))
        )
      )
    );
  });

  deleteClass$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(deleteClassFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(deleteClass),
      mergeMap(({ id }) =>
        this.classService.deleteClass(id).pipe(
          map(() => deleteClassSuccess({ id })),
          catchError(error => of(deleteClassFailure({ error })))
        )
      )
    );
  });

  constructor(
    @Inject(Actions) private actions$: Actions,
    private classService: ClassService
  ) {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined in constructor! Check dependency injection.');
    }
  }
}