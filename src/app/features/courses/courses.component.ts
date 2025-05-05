import { Component } from '@angular/core';
import { Course } from 'app/core/models/course.model';
import { CourseService } from './services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './course-form/course-form.component'; // Ajustada ruta

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: false
})
export class CoursesComponent {
  displayedColumns: string[] = ['courseName', 'description', 'credits', 'actions'];
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = ''; // Añadido

  constructor(private courseService: CourseService, private dialog: MatDialog) {
    this.loadCourses();
  }

  loadCourses(): void {
    try {
      this.courseService.getCoursesAsObservable().subscribe({
        next: (courses) => {
          this.courses = courses;
          this.filteredCourses = [...this.courses];
        },
        error: (err) => {
          console.error('Error al cargar cursos:', err);
        }
      });
    } catch (error) {
      console.error('Error inesperado al cargar cursos:', error);
    }
  }

  filterCourses(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredCourses = [...this.courses];
      return;
    }
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  openForm(courseToEdit?: Course): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '400px',
      data: { courseToEdit },
      ariaLabel: `Formulario de ${courseToEdit ? 'edición' : 'nuevo'} curso`,
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          if (courseToEdit) {
            this.courseService.editCourse(result);
          } else {
            this.courseService.addCourse(result);
          }
          this.loadCourses();
        } catch (error) {
          console.error('Error al guardar curso:', error);
        }
      }
    });
  }

  deleteCourse(courseId: number): void {
    try {
      this.courseService.deleteCourse(courseId);
      this.loadCourses();
    } catch (error) {
      console.error('Error al eliminar curso:', error);
    }
  }
}