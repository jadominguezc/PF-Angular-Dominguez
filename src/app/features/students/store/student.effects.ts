import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StudentService } from 'app/features/students/services/student.service';
import * as StudentActions from './student.actions';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(StudentActions.loadStudentsFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentService.getStudents().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    );
  });

  addStudent$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(StudentActions.addStudentFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) =>
        this.studentService.addStudent(student).pipe(
          map((newStudent) => StudentActions.addStudentSuccess({ student: newStudent })),
          catchError((error) => of(StudentActions.addStudentFailure({ error })))
        )
      )
    );
  });

  editStudent$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(StudentActions.editStudentFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(StudentActions.editStudent),
      mergeMap(({ student }) =>
        this.studentService.editStudent(student).pipe(
          map((updatedStudent) => StudentActions.editStudentSuccess({ student: updatedStudent })),
          catchError((error) => of(StudentActions.editStudentFailure({ error })))
        )
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(StudentActions.deleteStudentFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(({ id }) =>
        this.studentService.deleteStudent(id).pipe(
          map(() => StudentActions.deleteStudentSuccess({ id })),
          catchError((error) => of(StudentActions.deleteStudentFailure({ error })))
        )
      )
    );
  });

  constructor(
    @Inject(Actions) private actions$: Actions,
    private studentService: StudentService
  ) {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined in constructor! Check dependency injection.');
    }
  }
}