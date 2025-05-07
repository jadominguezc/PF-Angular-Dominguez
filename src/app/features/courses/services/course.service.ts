import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Course } from 'app/core/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialCourses();
  }

  private loadInitialCourses(): void {
    this.http.get<Course[]>(this.apiUrl).subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }

  getCoursesAsObservable(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshCourses(): void {
    this.http.get<Course[]>(this.apiUrl).subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }
}