import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'app/core/services/user.service';
import { User } from 'app/core/models/user.model';
import { Store } from '@ngrx/store';
import { login, logout } from 'app/core/store/app.actions';
import { RootState } from 'app/core/store/root-state';
import { selectUser } from 'app/core/store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inactivityTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private store: Store<RootState>
  ) {
    this.checkInitialAuth();
  }

  private checkInitialAuth(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.store.dispatch(login({ user }));
      this.startInactivityTimer();
    }
  }

  login(username: string, password: string): Observable<User[]> {
    return this.userService.getUserByUsername(username).pipe(
      tap(users => {
        if (users.length > 0 && users[0].password === password) {
          const user = users[0];
          this.store.dispatch(login({ user }));
          localStorage.setItem('userData', JSON.stringify(user));
          this.startInactivityTimer();
        } else {
          throw new Error('Credenciales inválidas');
        }
      })
    );
  }

  logout(): void {
    this.store.dispatch(logout());
    localStorage.removeItem('userData');
    clearTimeout(this.inactivityTimeout);
    this.router.navigate(['/login']);
  }

  startInactivityTimer(): void {
    this.resetTimer();
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keypress', () => this.resetTimer());
  }

  resetTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.store.select(selectUser).subscribe(user => {
        if (user) {
          this.logout();
          alert('Sesión cerrada por inactividad.');
        }
      });
    }, 5 * 60 * 1000);
  }
}