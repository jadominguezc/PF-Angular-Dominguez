import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from 'app/features/students/services/student.service';
import { ClassService } from 'app/features/classes/services/class.service';
import { CourseService } from 'app/features/courses/services/course.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    StudentService,
    ClassService,
    CourseService
  ]
})
export class CoreModule { }