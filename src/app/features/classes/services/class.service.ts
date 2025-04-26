import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Class } from 'app/core/models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: Class[] = [
    { id: 1, name: 'Matemáticas I', courseId: 1, schedule: 'Lunes 10:00-12:00', teacher: 'Prof. García' },
    { id: 2, name: 'Programación I', courseId: 2, schedule: 'Miércoles 14:00-16:00', teacher: 'Prof. López' }
  ];

  constructor() {}

  getClassesAsObservable(): Observable<Class[]> {
    return of(this.classes);
  }

  private generateUniqueId(): number {
    if (this.classes.length === 0) {
      return 1;
    }
    const lastId = Math.max(...this.classes.map(cls => cls.id));
    return lastId + 1;
  }

  addClass(cls: Omit<Class, 'id'>): Class {
    const newId = this.generateUniqueId();
    const newClass: Class = { ...cls, id: newId };
    this.classes = [...this.classes, newClass];
    return newClass;
  }

  editClass(updatedClass: Class): void {
    this.classes = this.classes.map(cls =>
      cls.id === updatedClass.id ? updatedClass : cls
    );
  }

  deleteClass(classId: number): void {
    this.classes = this.classes.filter(cls => cls.id !== classId);
  }
}