import { Component, ViewChild, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  @Input() sidenav!: MatSidenav;

  constructor(public authService: AuthService) {}

  closeSidenav(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}