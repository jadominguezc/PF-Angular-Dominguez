import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
  standalone: false
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', [Validators.required, this.rutValidator()]],
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.get('rut')?.valueChanges.subscribe(rut => {
      if (rut && this.rutValidator()(this.registerForm.get('rut')!) === null) {
        const username = rut.split('-')[0];
        this.registerForm.get('username')?.setValue(username);
      } else {
        this.registerForm.get('username')?.setValue('');
      }
    });
  }

  ngOnInit(): void {}

  rutValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      if (!rut) return null;

      // Expresión regular para 7 u 8 dígitos, guion, y dígito o K
      const rutPattern = /^[0-9]{7,8}-[0-9K]$/;
      if (!rutPattern.test(rut)) {
        console.log('Formato de RUT inválido:', rut);
        return { invalidRutFormat: true };
      }

      // Extraer dígitos y verificador
      const [digits, verifier] = rut.split('-');
      if (!digits || !verifier) {
        console.log('Fallo al extraer dígitos o verificador:', rut);
        return { invalidRutFormat: true };
      }

      // Validar que los dígitos sean 7 u 8
      if (digits.length < 7 || digits.length > 8 || !/^[0-9]+$/.test(digits)) {
        console.log('Dígitos inválidos:', digits);
        return { invalidRutDigits: true };
      }

      // Validar el dígito verificador
      if (!/^[0-9K]$/.test(verifier)) {
        console.log('Verificador inválido:', verifier);
        return { invalidRutVerifier: true };
      }

      console.log('RUT válido según formato:', rut);
      return null;
    };
  }

  rutUniqueValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const rut = control.value;
    if (!rut) return Promise.resolve(null);

    const username = rut.split('-')[0];
    return this.userService.getUserByUsername(username).pipe(
      map(users => {
        const isTaken = users.length > 0;
        console.log(`RUT ${rut} (${username}) - ¿Ya existe?`, isTaken, users);
        return isTaken ? { rutTaken: true } : null;
      })
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;

    console.log('Formulario enviado. Estado:', this.registerForm.valid ? 'Válido' : 'Inválido');
    console.log('Datos del formulario:', this.registerForm.value);
    console.log('Errores del campo RUT:', this.registerForm.get('rut')?.errors);

    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        role: 'user'
      };
      console.log('Enviando datos a la API:', userData);
      this.userService.registerUser(userData).subscribe({
        next: (user) => {
          console.log('Usuario registrado exitosamente:', user);
          this.dialogRef.close(user);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el usuario. Revisa la consola para más detalles.';
          console.error('Error al registrar:', err);
        }
      });
    } else {
      console.log('Formulario inválido. Errores:', this.registerForm.errors);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get rut() {
    return this.registerForm.get('rut');
  }

  get password() {
    return this.registerForm.get('password');
  }
}