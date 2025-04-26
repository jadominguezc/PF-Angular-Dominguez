export interface Class {
    id: number;
    name: string;
    courseId: number; // Relación con un curso
    schedule: string; // Ejemplo: "Lunes 10:00-12:00"
    teacher: string;
  }