import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'app/core/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: false
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  careers: string[] = ['Ing. Industrial' , 'Ing. Electrónica' , 'Ing. Informática','Lic. en Ciencias' , 'Ing. Química' , 'Ing. en Computación'];
  submitted = false;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentToEdit?: Student }
  ) {
    this.isEditing = !!data.studentToEdit;
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dkK]$/)]],
      career: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditing && this.data.studentToEdit) {
      this.studentForm.patchValue(this.data.studentToEdit);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.valid) {
      const studentData = this.isEditing
        ? { ...this.data.studentToEdit, ...this.studentForm.value }
        : this.studentForm.value;
      this.dialogRef.close(studentData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}