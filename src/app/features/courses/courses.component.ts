import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: false
})
export class CoursesComponent {
  // Definimos las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['courseName', 'description', 'credits'];

  // Datos de los cursos (simulados por ahora)
  courses = [
    { courseName: 'Ingeniería de Software', description: 'Curso introductorio a ingeniería de software', credits: 4 },
    { courseName: 'Bases de Datos', description: 'Fundamentos de bases de datos relacionales', credits: 3 },
    { courseName: 'Redes de Computadoras', description: 'Conceptos básicos de redes', credits: 3 },
    { courseName: 'Inteligencia Artificial', description: 'Introducción a la IA y sus aplicaciones', credits: 4 },
    { courseName: 'Desarrollo Web', description: 'Creación de aplicaciones web modernas', credits: 3 },
    { courseName: 'Seguridad Informática', description: 'Principios de seguridad en sistemas informáticos', credits: 3 },
    { courseName: 'Sistemas Operativos', description: 'Fundamentos de sistemas operativos modernos', credits: 4 },
    { courseName: 'Programación Avanzada', description: 'Técnicas avanzadas de programación', credits: 4 },
    { courseName: 'Análisis de Algoritmos', description: 'Estudio de algoritmos y su eficiencia', credits: 3 },
    { courseName: 'Computación Cuántica', description: 'Introducción a la computación cuántica', credits: 2 },
    { courseName: 'Desarrollo Móvil', description: 'Creación de aplicaciones móviles', credits: 5 },
  ];

  filteredCourses = [...this.courses]; // Lista filtrada para la tabla
  searchTerm = ''; // Término de búsqueda

  // Método para filtrar los cursos
  filterCourses(): void {
    if (!this.searchTerm) {
      this.filteredCourses = [...this.courses];
      return;
    }
    this.filteredCourses = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}