import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'app/core/models/student.model'; 

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {
  transform(student: Student): string {
    return `${student.firstName} ${student.lastName}`;
  }
}