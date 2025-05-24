import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import {
  loadCourses, loadCoursesSuccess, loadCoursesFailure,
  addCourse, addCourseSuccess, addCourseFailure,
  editCourse, editCourseSuccess, editCourseFailure,
  deleteCourse, deleteCourseSuccess, deleteCourseFailure
} from './course.actions';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(loadCoursesFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => of(loadCoursesFailure({ error })))
        )
      )
    );
  });

  addCourse$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(addCourseFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(addCourse),
      mergeMap(({ course }) =>
        this.courseService.addCourse(course).pipe(
          map(newCourse => addCourseSuccess({ course: newCourse })),
          catchError(error => of(addCourseFailure({ error })))
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(editCourseFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(editCourse),
      mergeMap(({ course }) =>
        this.courseService.editCourse(course).pipe(
          map(updatedCourse => editCourseSuccess({ course: updatedCourse })),
          catchError(error => of(editCourseFailure({ error })))
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(deleteCourseFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => deleteCourseSuccess({ id })),
          catchError(error => of(deleteCourseFailure({ error })))
        )
      )
    );
  });

  constructor(
    @Inject(Actions) private actions$: Actions,
    private courseService: CourseService
  ) {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined in constructor! Check dependency injection.');
    }
  }
}