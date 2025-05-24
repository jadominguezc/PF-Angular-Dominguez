import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false,
})
export class UserListComponent {
  @Input() data: User[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() viewUser = new EventEmitter<User>();
  displayedColumns: string[] = ['name', 'rut', 'username', 'role', 'actions'];

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(user: User): void {
    this.deleteUser.emit(user);
  }

  onView(user: User): void {
    this.viewUser.emit(user);
  }
}
