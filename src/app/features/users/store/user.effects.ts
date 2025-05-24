import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import {
  loadUsers, loadUsersSuccess, loadUsersFailure,
  addUser, addUserSuccess, addUserFailure,
  editUser, editUserSuccess, editUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure
} from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(loadUsersFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(addUserFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(addUser),
      mergeMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map(newUser => addUserSuccess({ user: newUser })),
          catchError(error => of(addUserFailure({ error })))
        )
      )
    );
  });

  editUser$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(editUserFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(editUser),
      mergeMap(({ user }) =>
        this.userService.editUser(user).pipe(
          map(updatedUser => editUserSuccess({ user: updatedUser })),
          catchError(error => of(editUserFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined or not an Observable! Check EffectsModule registration.');
      return of(deleteUserFailure({ error: 'Actions not injected' }));
    }
    return this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => deleteUserSuccess({ id })),
          catchError(error => of(deleteUserFailure({ error })))
        )
      )
    );
  });

  constructor(
    @Inject(Actions) private actions$: Actions,
    private userService: UserService
  ) {
    if (!this.actions$ || !(this.actions$ instanceof Observable)) {
      console.error('Actions is undefined in constructor! Check dependency injection.');
    }
  }
}