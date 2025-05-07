import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ClassesComponent } from './classes.component';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListComponent } from './components/class-list/class-list.component';

@NgModule({
  declarations: [
    ClassesComponent,
    ClassFormComponent,
    ClassListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ClassesRoutingModule
  ],
  exports: [
    ClassesComponent
  ]
})
export class ClassesModule { }