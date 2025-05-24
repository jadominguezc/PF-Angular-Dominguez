import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Class } from 'app/core/models/class.model';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  standalone: false
})
export class ClassListComponent {
  @Input() data: Class[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editClass = new EventEmitter<Class>();
  @Output() deleteClass = new EventEmitter<Class>();
  @Output() viewClass = new EventEmitter<Class>();
  displayedColumns: string[] = ['name', 'schedule', 'teacher', 'actions'];

  onEdit(cls: Class): void {
    this.editClass.emit(cls);
  }

  onDelete(cls: Class): void {
    this.deleteClass.emit(cls);
  }

  onView(cls: Class): void {
    this.viewClass.emit(cls);
  }
}