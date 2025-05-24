import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'app/core/models/student.model';
import { MatTableDataSource } from '@angular/material/table'; 

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
  @Output() viewStudent = new EventEmitter<Student>();
  displayedColumns: string[] = ['fullName', 'email', 'rut', 'career', 'actions'];

  dataSource = new MatTableDataSource<Student>(this.data); 


  ngOnChanges() {
    if (this.data) {
      this.dataSource.data = this.data;
    }
  }

  onEdit(student: Student): void {
    this.editStudent.emit(student);
  }

  onDelete(student: Student): void {
    this.deleteStudent.emit(student);
  }

  onView(student: Student): void {
    this.viewStudent.emit(student);
  }
}