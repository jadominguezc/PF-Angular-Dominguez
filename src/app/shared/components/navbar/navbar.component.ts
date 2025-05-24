import { Component, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state'; 
import { selectIsLoggedIn, selectUserRole } from 'app/core/store/app.selectors';
import { logout } from 'app/core/store/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  @Input() sidenav!: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  userRole$: Observable<string | null>;

  constructor(private store: Store<RootState>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.userRole$ = this.store.select(selectUserRole);
  }

  closeSidenav(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}