import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from 'app/core/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Ingeniería de Software', description: 'Curso introductorio a ingeniería de software', credits: 4 },
    { id: 2, name: 'Bases de Datos', description: 'Fundamentos de bases de datos relacionales', credits: 3 }
  ];

  constructor() {}

  getCoursesAsObservable(): Observable<Course[]> {
    return of(this.courses);
  }

  private generateUniqueId(): number {
    if (this.courses.length === 0) {
      return 1;
    }
    const lastId = Math.max(...this.courses.map(course => course.id));
    return lastId + 1;
  }

  addCourse(course: Omit<Course, 'id'>): Course {
    const newId = this.generateUniqueId();
    const newCourse: Course = { ...course, id: newId };
    this.courses = [...this.courses, newCourse];
    return newCourse;
  }

  editCourse(updatedCourse: Course): void {
    this.courses = this.courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
  }

  deleteCourse(courseId: number): void {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }
}