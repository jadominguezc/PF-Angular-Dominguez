import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from 'app/core/models/class.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  standalone: false
})
export class ClassFormComponent {
  classForm: FormGroup;
  submitted = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classToEdit?: Class }
  ) {
    this.classForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      schedule: ['', Validators.required],
      teacher: ['', [Validators.required, Validators.minLength(3)]],
      courseId: ['', Validators.required]
    });

    if (this.data.classToEdit) {
      this.isEditing = true;
      this.classForm.patchValue(this.data.classToEdit);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.classForm.valid) {
      const classData = this.classForm.value;
      const newClass: Class | Omit<Class, 'id'> = this.isEditing
        ? { ...this.data.classToEdit, ...classData }
        : classData;
      this.dialogRef.close(newClass);
    } else {
      Object.values(this.classForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}