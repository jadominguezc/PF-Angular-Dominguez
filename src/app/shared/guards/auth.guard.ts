import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectIsLoggedIn } from 'app/core/store/app.selectors';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<RootState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1),
      tap((isLoggedIn) => {
        if (!isLoggedIn && state.url !== '/login') {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      }),
      map((isLoggedIn) => {
        return isLoggedIn || state.url === '/login';
      })
    );
  }
}
