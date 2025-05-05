import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'app/core/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  standalone: false
})
export class CourseFormComponent {
  courseForm: FormGroup;
  submitted = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseToEdit?: Course }
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      credits: ['', [Validators.required, Validators.min(1)]]
    });

    if (this.data.courseToEdit) {
      this.isEditing = true;
      this.courseForm.patchValue(this.data.courseToEdit);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      const newCourse: Course | Omit<Course, 'id'> = this.isEditing
        ? { ...this.data.courseToEdit, ...courseData }
        : courseData;
      this.dialogRef.close(newCourse);
    } else {
      Object.values(this.courseForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}