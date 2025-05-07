import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }