import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from 'app/core/models/class.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  standalone: false
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classToEdit?: Class }
  ) {
    this.classForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      schedule: ['', Validators.required],
      teacher: ['', Validators.required]
    });

    if (this.data?.classToEdit) {
      this.isEditMode = true;
      this.classForm.patchValue(this.data.classToEdit);
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.classForm.invalid) {
      console.log('Formulario inválido:', this.classForm.value);
      this.classForm.markAllAsTouched();
      return;
    }

    const formValue = this.classForm.value;
    this.dialogRef.close(formValue);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}