import { Component } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: false
})
export class ClassesComponent {
  displayedColumns: string[] = ['className', 'day', 'schedule', 'professor'];

  // Datos de las clases que se mostrarán en la tabla
  classes = [
    { className: 'Matemáticas I', day: 'Lunes', schedule: '10:00-12:00', professor: 'Prof. Mirna García' },
    { className: 'Programación I', day: 'Miércoles', schedule: '14:00-16:00', professor: 'Ing. José López' },
    { className: 'Física I', day: 'Martes', schedule: '08:00-10:00', professor: 'Ing. Ana Torres' },
    { className: 'Química I', day: 'Jueves', schedule: '12:00-14:00', professor: 'Ing. Luis Pérez' },
    { className: 'Historia I', day: 'Viernes', schedule: '16:00-18:00', professor: 'Prof. María Fernández' },
    { className: 'Biología I', day: 'Lunes', schedule: '08:00-10:00', professor: 'Prof. Carlos Martínez' },
    { className: 'Literatura I', day: 'Miércoles', schedule: '10:00-12:00', professor: 'Prof. Laura Gómez' },
    { className: 'Geografía I', day: 'Jueves', schedule: '14:00-16:00', professor: 'Prof. Andrés Ramírez' },
    { className: 'Educación Física I', day: 'Viernes', schedule: '12:00-14:00', professor: 'Prof. Sofía Morales' }
  ];

  filteredClasses = [...this.classes]; 
  searchTerm = ''; 

  filterClasses(): void {
    if (!this.searchTerm) {
      this.filteredClasses = [...this.classes];
      return;
    }
    this.filteredClasses = this.classes.filter(cls =>
      cls.className.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}