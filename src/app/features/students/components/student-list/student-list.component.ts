import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from 'app/models/student.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: false
})
export class StudentListComponent implements OnChanges {
  @Input() students: Student[] = [];
  @Output() openFormEvent = new EventEmitter<void>();
  @Output() editStudentEvent = new EventEmitter<Student>(); 
  @Output() deleteStudentEvent = new EventEmitter<Student>(); 
  displayedColumns: string[] = ['id', 'fullNameColumn', 'email', 'rut', 'career', 'actions']; 
  dataSource = new MatTableDataSource<Student>([]);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && changes['students'].currentValue) {
      this.dataSource.data = this.students;
      console.log('DataSource actualizado:', this.dataSource.data);
    }
  }

  openForm(): void {
    this.openFormEvent.emit();
  }

  editStudent(student: Student): void {
    this.editStudentEvent.emit(student);
    console.log('Editar estudiante:', student);
  }

  deleteStudent(student: Student): void {
    this.deleteStudentEvent.emit(student);
    console.log('Eliminar estudiante:', student);
  }

  getFullName(student: Student): string {
    console.log('getFullName ejecutado para:', student);
    return student ? `${student.firstName} ${student.lastName}` : '';
  }
}