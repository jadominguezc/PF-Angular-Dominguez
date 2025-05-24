import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { RootState } from './core/store/root-state';
import { setToolbarTitle } from './core/store/app.actions';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { selectUsername } from './core/store/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  username$: Observable<string | null>;

  constructor(
    private store: Store<RootState>,
    private router: Router
  ) {
    this.username$ = this.store.select(selectUsername);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      let title = 'Inicio';
      if (url.includes('students')) title = 'Alumnos';
      else if (url.includes('classes')) title = 'Clases';
      else if (url.includes('users')) title = 'Usuarios';
      else if (url.includes('courses')) title = 'Cursos';
      else if (url.includes('login')) title = 'Iniciar Sesión';
      this.store.dispatch(setToolbarTitle({ title }));
    });

    // Depuración
    this.username$.subscribe(username => {
      console.log('Username from store:', username);
    });
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    } else {
      console.warn('Sidenav no está definido');
    }
  }
}