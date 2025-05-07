import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: false
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public authService: AuthService) {}

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
    this.authService.resetTimer();
  }
}