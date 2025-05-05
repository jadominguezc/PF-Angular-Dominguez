import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { ReactiveFormsModule } from '@angular/forms'; // Añadido para formGroup
import { SharedModule } from 'app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, // Añadido
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }