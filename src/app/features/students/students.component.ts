import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from 'app/core/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectAllStudents } from './store/student.selectors';
import { loadStudents, addStudent, editStudent, deleteStudent } from './store/student.actions';
import { selectUserRole } from 'app/core/store/app.selectors';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: false
})
export class StudentsComponent implements OnDestroy, OnInit {
  students$: Observable<Student[]>;
  filteredStudents: Student[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  displayedColumns: string[] = ['fullName', 'email', 'rut', 'career', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.students$ = this.store.select(selectAllStudents);
    this.loadStudents();
  }

  ngOnInit(): void {
    this.store.select(selectUserRole).subscribe(role => {
      this.isAdmin = role === 'admin';
    });

    this.students$.subscribe({
      next: (students) => {
        this.filteredStudents = students || [];
        this.dataSource.data = this.filteredStudents;
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.filteredStudents = [];
        this.dataSource.data = this.filteredStudents;
      }
    });
  }

  loadStudents(): void {
    this.store.dispatch(loadStudents());
  }

  filterStudents(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.students$.subscribe({
        next: (students) => {
          this.filteredStudents = students || [];
          this.dataSource.data = this.filteredStudents;
        },
        error: (err) => {
          console.error('Error filtering students:', err);
          this.filteredStudents = [];
          this.dataSource.data = this.filteredStudents;
        }
      });
      return;
    }
    this.students$.subscribe({
      next: (students) => {
        this.filteredStudents = (students || []).filter(student =>
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.dataSource.data = this.filteredStudents;
      },
      error: (err) => {
        console.error('Error filtering students:', err);
        this.filteredStudents = [];
        this.dataSource.data = this.filteredStudents;
      }
    });
  }

  addStudent(studentData: Omit<Student, 'id'>): void {
    if (this.isAdmin) {
      this.store.dispatch(addStudent({ student: studentData }));
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

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(editStudent({ student: result }));
        }
      });
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

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteStudent({ id: student.id }));
        }
      });
    }
  }

  viewStudent(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `
          <strong>Detalles del Alumno:</strong><br>
          Nombre: ${student.firstName} ${student.lastName}<br>
          Email: ${student.email}<br>
          RUT: ${student.rut}<br>
          Carrera: ${student.career}
        `,
        isDetails: true
      },
      ariaLabel: 'Detalles del alumno',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe();
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

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addStudent(result);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}