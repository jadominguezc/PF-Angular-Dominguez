import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'app/core/services/user.service';
import { User } from 'app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole: string | null = null;
  private currentUser: User | null = null;
  private inactivityTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.checkInitialAuth();
  }

  private checkInitialAuth(): void {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const userData = localStorage.getItem('userData');
    if (token && role && userData) {
      this.isAuthenticated.next(true);
      this.userRole = role;
      this.currentUser = JSON.parse(userData);
      this.startInactivityTimer();
    } else {
      this.isAuthenticated.next(false);
      this.userRole = null;
      this.currentUser = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    }
  }

  login(username: string, password: string): Observable<User[]> {
    return this.userService.getUserByUsername(username).pipe(
      tap(users => {
        if (users.length > 0 && users[0].password === password) {
          this.currentUser = users[0];
          this.isAuthenticated.next(true);
          this.userRole = users[0].role;
          localStorage.setItem('authToken', 'dummy-token');
          localStorage.setItem('userRole', this.userRole);
          localStorage.setItem('userData', JSON.stringify(this.currentUser));
          this.startInactivityTimer();
        } else {
          throw new Error('Credenciales inválidas');
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.userRole = null;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    clearTimeout(this.inactivityTimeout);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getRole(): string | null {
    return this.userRole;
  }

  startInactivityTimer(): void {
    this.resetTimer();
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keypress', () => this.resetTimer());
  }

  resetTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      if (this.isAuthenticated.value) {
        this.logout();
        alert('Sesión cerrada por inactividad.');
      }
    }, 5 * 60 * 1000); // Con 5 minutos de inactividad en la sesión se hará un logout y se mostrará un mensaje de alerta
  }
}