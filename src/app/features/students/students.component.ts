import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from 'app/core/models/student.model'; // Nueva ruta
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: false
})
export class StudentsComponent implements OnDestroy {
  students$!: Observable<Student[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService
  ) {
    this.students$ = this.studentService.getStudentsAsObservable();

    this.studentService.getStudentsAsPromise()
      .then(students => {
        console.log('Estudiantes obtenidos vía promesa:', students);
      })
      .catch(error => {
        console.error('Error al obtener estudiantes vía promesa:', error);
      });
  }

  addStudent(student: Omit<Student, 'id'>): void {
    this.studentService.addStudent(student);
    this.students$ = this.studentService.getStudentsAsObservable();
    console.log('Estudiante añadido:', student);
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: { studentToEdit: student },
      ariaLabel: 'Formulario de edición de alumno',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Resultado del diálogo (editar):', result);
        if (result) {
          this.studentService.editStudent(result);
          this.students$ = this.studentService.getStudentsAsObservable();
          console.log('Estudiante actualizado:', result);
        }
      });
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student.id);
    this.students$ = this.studentService.getStudentsAsObservable();
    console.log('Estudiante eliminado:', student);
  }

  openForm(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
      data: {},
      ariaLabel: 'Formulario de nuevo alumno',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Resultado del diálogo:', result);
        if (result) {
          this.addStudent(result);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}