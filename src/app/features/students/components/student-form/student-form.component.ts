import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'app/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: false
})
export class StudentFormComponent {
  studentForm: FormGroup;
  careers = ['Ing. Industrial', 'Ing. Electrónica', 'Ing. Informática'];
  submitted = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentToEdit?: Student }
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dK]$/)]],
      career: ['', Validators.required]
    });

    if (this.data.studentToEdit) {
      this.isEditing = true;
      this.studentForm.patchValue(this.data.studentToEdit);
    }

    this.studentForm.get('rut')?.valueChanges.subscribe(value => {
      if (value) {
        const cleanedRut = value.replace(/\./g, '');
        if (cleanedRut !== value) {
          this.studentForm.get('rut')?.setValue(cleanedRut, { emitEvent: false });
        }
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('onSubmit ejecutado');
    console.log('Valores del formulario:', this.studentForm.value);
    console.log('Formulario válido:', this.studentForm.valid);

    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      const newStudent: Student | Omit<Student, 'id'> = this.isEditing
        ? { ...this.data.studentToEdit, ...studentData }
        : studentData; // No generamos el ID aquí, el servicio lo hará
      console.log('Enviando estudiante:', newStudent);
      this.dialogRef.close(newStudent);
    } else {
      console.log('Formulario inválido');
      Object.values(this.studentForm.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('Errores del formulario:', this.studentForm.errors);
      console.log('Controles del formulario:', this.studentForm.controls);
    }
  }

  onCancel(): void {
    console.log('onCancel ejecutado');
    this.dialogRef.close();
  }
}