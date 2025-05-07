import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from 'app/auth/components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.authService.resetTimer();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
          console.error('Error al iniciar sesión:', err);
        }
      });
    }
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuario registrado desde el diálogo:', result);
        this.authService.login(result.username, result.password).subscribe({
          next: () => {
            this.authService.resetTimer();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al iniciar sesión automáticamente:', err);
            this.errorMessage = 'Usuario registrado, pero error al iniciar sesión automáticamente';
          }
        });
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}