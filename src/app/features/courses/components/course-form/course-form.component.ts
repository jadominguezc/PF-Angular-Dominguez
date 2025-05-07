import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'app/core/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  standalone: false
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseToEdit?: Course }
  ) {
    this.isEditing = !!data.courseToEdit;
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditing && this.data.courseToEdit) {
      this.courseForm.patchValue(this.data.courseToEdit);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      const courseData = this.isEditing
        ? { ...this.data.courseToEdit, ...this.courseForm.value }
        : this.courseForm.value;
      this.dialogRef.close(courseData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}