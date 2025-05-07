export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rut: string;
  career: 'Ing. Industrial' | 'Ing. Electrónica' | 'Ing. Informática'|'Lic. en Ciencias' | 'Ing. Química' | 'Ing. en Computación';
}
