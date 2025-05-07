import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'app/core/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: false
})
export class StudentListComponent {
  @Input() data: Student[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editStudent = new EventEmitter<Student>();
  @Output() deleteStudent = new EventEmitter<Student>();
  displayedColumns: string[] = ['fullName', 'email', 'rut', 'career', 'actions'];

  onEdit(student: Student): void {
    this.editStudent.emit(student);
  }

  onDelete(student: Student): void {
    this.deleteStudent.emit(student);
  }
}