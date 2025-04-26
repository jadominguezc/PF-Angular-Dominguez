import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  @Output() closeSidenavEvent = new EventEmitter<void>();

  closeSidenav(event: Event): void {
    event.preventDefault(); // Elimina esta línea si está presente
    this.closeSidenavEvent.emit();
  }
}