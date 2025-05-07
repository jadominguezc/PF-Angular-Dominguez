import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from 'app/core/models/course.model';
import { CourseService } from './services/course.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: false
})
export class CoursesComponent implements OnDestroy, OnInit {
  courses$!: Observable<Course[]>;
  filteredCourses: Course[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  searchTerm: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadCourses();
  }

  ngOnInit(): void {
    this.updateAdminStatus();
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.authService.getRole() === 'admin';
    console.log('isAdmin (Courses):', this.isAdmin);
  }

  loadCourses(): void {
    this.courses$ = this.courseService.getCoursesAsObservable();
    this.courses$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(courses => {
      this.filteredCourses = courses || [];
      this.filterCourses(this.searchTerm);
    });
  }

  filterCourses(searchTerm: string): void {
    this.searchTerm = searchTerm;
    if (!searchTerm.trim()) {
      this.courses$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(courses => {
        this.filteredCourses = courses || [];
      });
      return;
    }
    this.courses$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(courses => {
      this.filteredCourses = (courses || []).filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  openForm(course?: Course): void {
    if (!this.isAdmin) {
      console.log('No tienes permisos para añadir/editar cursos.');
      return;
    }
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '400px',
      data: { courseToEdit: course },
      ariaLabel: 'Formulario de curso',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      if (result) {
        this.saveCourse(result);
      }
    });
  }

  saveCourse(courseData: Partial<Course>): void {
    if (!this.isAdmin) return;

    if (!courseData.name || !courseData.description) {
      console.error('Nombre y descripción son requeridos');
      return;
    }

    const validatedData: Omit<Course, 'id'> = {
      name: courseData.name,
      description: courseData.description
    };

    if (courseData.id) {
      const updatedCourse: Course = {
        id: courseData.id,
        name: courseData.name!,
        description: courseData.description!
      };
      this.courseService.editCourse(updatedCourse).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.courseService.refreshCourses();
          this.loadCourses();
        },
        error: (err) => console.error('Error al editar curso:', err)
      });
    } else {
      this.courseService.addCourse(validatedData).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.courseService.refreshCourses();
          this.loadCourses();
        },
        error: (err) => console.error('Error al añadir curso:', err)
      });
    }
  }

  editCourse(course: Course): void {
    if (this.isAdmin) {
      this.openForm(course);
    } else {
      console.log('No tienes permisos para editar cursos.');
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

      dialogRef.afterClosed().pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        if (result) {
          this.courseService.deleteCourse(course.id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.courseService.refreshCourses();
              this.loadCourses();
            },
            error: (err) => console.error('Error al eliminar curso:', err)
          });
        }
      });
    } else {
      console.log('No tienes permisos para eliminar cursos.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}