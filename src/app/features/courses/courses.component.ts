import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Course } from 'app/core/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectAllCourses } from './store/course.selectors';
import { loadCourses, addCourse, editCourse, deleteCourse } from './store/course.actions';
import { selectUserRole } from 'app/core/store/app.selectors';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: false
})
export class CoursesComponent implements OnDestroy, OnInit {
  courses$: Observable<Course[]>;
  filteredCourses: Course[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'credits', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loadCourses();
  }

  ngOnInit(): void {
    this.store.select(selectUserRole).subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    this.courses$.subscribe(courses => {
      this.filteredCourses = courses || [];
      this.dataSource.data = this.filteredCourses;
    });
  }

  loadCourses(): void {
    this.store.dispatch(loadCourses());
  }

  filterCourses(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.courses$.subscribe(courses => {
        this.filteredCourses = courses || [];
        this.dataSource.data = this.filteredCourses;
      });
      return;
    }
    this.courses$.subscribe(courses => {
      this.filteredCourses = (courses || []).filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.dataSource.data = this.filteredCourses;
    });
  }

  addCourse(courseData: Omit<Course, 'id'>): void {
    if (this.isAdmin) {
      this.store.dispatch(addCourse({ course: courseData }));
    }
  }

  editCourse(course: Course): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(CourseFormComponent, {
        width: '400px',
        data: { courseToEdit: course },
        ariaLabel: 'Formulario de edición de curso',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(editCourse({ course: result }));
        }
      });
    }
  }

  deleteCourse(course: Course): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `¿Estás seguro de eliminar el curso ${course.name}?` },
        ariaLabel: 'Confirmar eliminación',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteCourse({ id: course.id }));
        }
      });
    }
  }

  viewCourse(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `
          <strong>Detalles del Curso:</strong><br>
          Nombre: ${course.name}<br>
          Descripción: ${course.description}<br>
          Créditos: ${course.credits}
        `,
        isDetails: true
      },
      ariaLabel: 'Detalles del curso',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe();
  }

  openForm(): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(CourseFormComponent, {
        width: '400px',
        data: {},
        ariaLabel: 'Formulario de nuevo curso',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addCourse(result);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}