import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from 'app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, firstName: 'Ana', lastName: 'Torres', email: 'ana.torres@institutoacademico.cl', rut: '12345678-9', career: 'Ing. Informática' },
    { id: 2, firstName: 'Luis', lastName: 'Gómez', email: 'luis.gomez@institutoacademico.cl', rut: '98765432-1', career: 'Ing. Industrial' }
  ];

  constructor() {}

  getStudentsAsPromise(): Promise<Student[]> {
    return Promise.resolve(this.students);
  }

  getStudentsAsObservable(): Observable<Student[]> {
    return of(this.students);
  }

  // Nuevo método para generar un ID único
  private generateUniqueId(): number {
    if (this.students.length === 0) {
      return 1; // Si no hay estudiantes, el primer ID será 1
    }
    const lastId = Math.max(...this.students.map(student => student.id));
    return lastId + 1; // Retorna el último ID + 1
  }

  addStudent(student: Omit<Student, 'id'>): Student {
    const newId = this.generateUniqueId();
    const newStudent: Student = { ...student, id: newId };
    this.students = [...this.students, newStudent];
    return newStudent;
  }

  editStudent(updatedStudent: Student): void {
    this.students = this.students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
  }

  deleteStudent(studentId: number): void {
    this.students = this.students.filter(student => student.id !== studentId);
  }
}