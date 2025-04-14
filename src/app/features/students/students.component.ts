import { Component } from '@angular/core';
import { Student } from 'app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: false
})
export class StudentsComponent {
  students: Student[] = [
    { id: 1, firstName: 'Ana', lastName: 'Torres', email: 'ana.torres@institutoacademico.cl', rut: '12345678-9', career: 'Ing. Informática' },
    { id: 2, firstName: 'Luis', lastName: 'Gómez', email: 'luis.gomez@institutoacademico.cl', rut: '98765432-1', career: 'Ing. Industrial' }
  ];

  constructor(private dialog: MatDialog) {}

  addStudent(student: Student): void {
    this.students = [...this.students, student];
    console.log('Estudiante añadido:', student);
    console.log('Lista de estudiantes actualizada:', this.students);
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: { students: this.students, studentToEdit: student },
      ariaLabel: 'Formulario de edición de alumno',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado del diálogo (editar):', result);
      if (result) {
        this.students = this.students.map(s => (s.id === student.id ? { ...s, ...result } : s));
        console.log('Estudiante actualizado:', result);
        console.log('Lista de estudiantes actualizada:', this.students);
      }
    });
  }

  deleteStudent(student: Student): void {
    this.students = this.students.filter(s => s.id !== student.id);
    console.log('Estudiante eliminado:', student);
    console.log('Lista de estudiantes actualizada:', this.students);
  }

  openForm(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: { students: this.students },
      ariaLabel: 'Formulario de nuevo alumno',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado del diálogo:', result);
      if (result) {
        this.addStudent(result);
      }
    });
  }
}