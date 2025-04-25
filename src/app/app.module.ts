import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { StudentsComponent } from './features/students/students.component';
import { StudentListComponent } from './features/students/components/student-list/student-list.component';
import { StudentFormComponent } from './features/students/components/student-form/student-form.component';
import { FullNamePipe } from './shared/pipes/full-name.pipe';
import { TitleSizeDirective } from './shared/directives/title-size.directive';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component'; // Nuevo componente

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavbarComponent,
    StudentsComponent,
    StudentListComponent,
    StudentFormComponent,
    FullNamePipe,
    TitleSizeDirective,
    ConfirmationDialogComponent // Declarar el nuevo componente
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}