import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Class } from 'app/core/models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:3000/classes';
  private classesSubject = new BehaviorSubject<Class[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialClasses();
  }

  private loadInitialClasses(): void {
    this.http.get<Class[]>(this.apiUrl).subscribe(classes => {
      this.classesSubject.next(classes);
    });
  }

  getClassesAsObservable(): Observable<Class[]> {
    return this.classesSubject.asObservable();
  }

  addClass(classData: Omit<Class, 'id'>): Observable<Class> {
    return this.http.post<Class>(this.apiUrl, classData);
  }

  editClass(classData: Class): Observable<Class> {
    return this.http.put<Class>(`${this.apiUrl}/${classData.id}`, classData);
  }

  deleteClass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshClasses(): void {
    this.http.get<Class[]>(this.apiUrl).subscribe(classes => {
      this.classesSubject.next(classes);
    });
  }
}