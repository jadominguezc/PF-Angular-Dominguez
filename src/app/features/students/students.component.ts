import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from 'app/core/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { StudentService } from './services/student.service';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: false
})
export class StudentsComponent implements OnDestroy, OnInit {
  students$!: Observable<Student[]>;
  filteredStudents: Student[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  displayedColumns: string[] = ['fullName', 'email', 'rut', 'career', 'actions'];

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService,
    private authService: AuthService
  ) {
    this.loadStudents();
  }

  ngOnInit(): void {
    this.updateAdminStatus();
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.authService.getRole() === 'admin';
    console.log('isAdmin:', this.isAdmin);
  }

  loadStudents(): void {
    this.students$ = this.studentService.getStudentsAsObservable();
    this.students$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(students => {
      this.filteredStudents = students || [];
    });
  }

  filterStudents(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.students$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(students => {
        this.filteredStudents = students || [];
      });
      return;
    }
    this.students$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(students => {
      this.filteredStudents = (students || []).filter(student =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
  }

  addStudent(student: Omit<Student, 'id'>): void {
    if (this.isAdmin) {
      this.studentService.addStudent(student).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.studentService.refreshStudents();
          this.loadStudents();
        },
        error: (err) => console.error('Error al añadir estudiante:', err)
      });
    } else {
      console.log('No tienes permisos para añadir estudiantes.');
    }
  }

  editStudent(student: Student): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(StudentFormComponent, {
        width: '400px',
        data: { studentToEdit: student },
        ariaLabel: 'Formulario de edición de alumno',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        if (result) {
          this.studentService.editStudent(result).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.studentService.refreshStudents();
              this.loadStudents();
            },
            error: (err) => console.error('Error al editar estudiante:', err)
          });
        }
      });
    } else {
      console.log('No tienes permisos para editar estudiantes.');
    }
  }

  deleteStudent(student: Student): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `¿Estás seguro de eliminar a ${student.firstName} ${student.lastName}?` },
        ariaLabel: 'Confirmar eliminación',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        console.log('Resultado del diálogo:', result);
        if (result) {
          this.studentService.deleteStudent(student.id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.studentService.refreshStudents();
              this.loadStudents();
            },
            error: (err) => console.error('Error al eliminar estudiante:', err)
          });
        }
      });
    } else {
      console.log('No tienes permisos para eliminar estudiantes.');
    }
  }

  openForm(): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(StudentFormComponent, {
        width: '400px',
        data: {},
        ariaLabel: 'Formulario de nuevo alumno',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        if (result) {
          this.addStudent(result);
        }
      });
    } else {
      console.log('No tienes permisos para añadir estudiantes.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}