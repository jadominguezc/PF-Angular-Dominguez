import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { studentReducer } from './store/student.reducer';
import { StudentService } from './services/student.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('students', studentReducer),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    StudentService
  ],
  exports: [
    StudentsComponent,
    StudentListComponent,
    StudentFormComponent
  ]
})
export class StudentsModule { }