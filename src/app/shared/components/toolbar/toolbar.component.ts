import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectIsLoggedIn, selectUser, selectToolbarTitle } from 'app/core/store/app.selectors';
import { Observable } from 'rxjs';
import { User } from 'app/core/models/user.model';
import { logout } from 'app/core/store/app.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: false
})
export class ToolbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  title$: Observable<string>;

  @Output() toggleSidenav = new EventEmitter<void>(); 

  constructor(private store: Store<RootState>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUser);
    this.title$ = this.store.select(selectToolbarTitle);
  }

  ngOnInit(): void {}

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.store.dispatch(logout()); 
  }
}