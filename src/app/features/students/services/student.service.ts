import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Student } from 'app/core/models/student.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';
  private studentsSubject = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialStudents();
  }

  private loadInitialStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe(students => {
      this.studentsSubject.next(students);
    });
  }

  getStudentsAsObservable(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    const newStudent: Student = { ...student, id: uuidv4() };
    return this.http.post<Student>(this.apiUrl, newStudent);
  }

  editStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe(students => {
      this.studentsSubject.next(students);
    });
  }
}