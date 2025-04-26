import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Student } from 'app/core/models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable, Subject, combineLatest, of, startWith, map, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: false
})
export class StudentListComponent implements OnChanges, OnDestroy {
  @Input() students: Student[] = [];
  @Output() openFormEvent = new EventEmitter<void>();
  @Output() editStudentEvent = new EventEmitter<Student>();
  @Output() deleteStudentEvent = new EventEmitter<Student>();
  displayedColumns: string[] = ['id', 'fullNameColumn', 'email', 'rut', 'career', 'actions'];
  studentTableDataSource = new MatTableDataSource<Student>([]); 
  searchControl = new FormControl('');
  filteredStudents$!: Observable<Student[]>;
  private destroy$ = new Subject<void>(); 

  constructor(private dialog: MatDialog) {
    this.setupFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && changes['students'].currentValue) {
      this.setupFilter();
    }
  }

  private setupFilter(): void {
    const students$ = of(this.students);
    const searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith('')
    );

    this.filteredStudents$ = combineLatest([students$, searchTerm$]).pipe(
      map(([students, searchTerm]) => {
        if (!searchTerm) {
          return students;
        }
        const searchLower = searchTerm.toLowerCase();
        return students.filter(student => {
          const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
          return fullName.includes(searchLower);
        });
      }),
      takeUntil(this.destroy$)
    );

    this.filteredStudents$.subscribe(filteredStudents => {
      this.studentTableDataSource.data = filteredStudents; 
      console.log('DataSource actualizado con estudiantes filtrados:', filteredStudents);
    });
  }

  openForm(): void {
    this.openFormEvent.emit();
  }

  editStudent(student: Student): void {
    this.editStudentEvent.emit(student);
    console.log('Editar estudiante:', student);
  }

  deleteStudent(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {},
      ariaLabel: 'Confirmar eliminación de estudiante',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStudentEvent.emit(student);
        console.log('Eliminar estudiante:', student);
      } else {
        console.log('Eliminación cancelada para:', student);
      }
    });
  }

  getFullName(student: Student): string {
    console.log('getFullName ejecutado para:', student);
    return student ? `${student.firstName} ${student.lastName}` : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}