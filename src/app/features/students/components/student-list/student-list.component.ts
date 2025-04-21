import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Student } from 'app/models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable, Subject, combineLatest, of, startWith, map, takeUntil } from 'rxjs';

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
  dataSource = new MatTableDataSource<Student>([]);
  searchControl = new FormControl(''); // Control para el campo de búsqueda
  filteredStudents$!: Observable<Student[]>; // Observable para los estudiantes filtrados
  private destroy$ = new Subject<void>(); // Para manejar la destrucción

  constructor() {
    this.setupFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && changes['students'].currentValue) {
      this.setupFilter();
    }
  }

  private setupFilter(): void {
    const students$ = of(this.students); // Convertir el arreglo de estudiantes en un observable
    const searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith('') // Iniciar con una cadena vacía
    );

    // Combinar los estudiantes y el término de búsqueda para filtrar reactivamente
    this.filteredStudents$ = combineLatest([students$, searchTerm$]).pipe(
      map(([students, searchTerm]) => {
        if (!searchTerm) {
          return students; // Si no hay término de búsqueda, devolver todos los estudiantes
        }
        const searchLower = searchTerm.toLowerCase();
        return students.filter(student => {
          const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
          return fullName.includes(searchLower);
        });
      }),
      takeUntil(this.destroy$)
    );

    // Suscribirse al observable filtrado para actualizar el dataSource
    this.filteredStudents$.subscribe(filteredStudents => {
      this.dataSource.data = filteredStudents;
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
    this.deleteStudentEvent.emit(student);
    console.log('Eliminar estudiante:', student);
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