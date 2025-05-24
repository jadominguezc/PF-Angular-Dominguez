import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: false
})
export class UserFormComponent {
  userForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userToEdit?: User },
    private fb: FormBuilder
  ) {
    this.isEditing = !!data.userToEdit;
    this.userForm = this.fb.group({
      name: [data.userToEdit?.name || '', [Validators.required]],
      rut: [data.userToEdit?.rut || '', [Validators.required]],
      username: [data.userToEdit?.username || '', [Validators.required]],
      password: [data.userToEdit?.password || '', [Validators.required]],
      role: [data.userToEdit?.role || 'user', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        ...this.userForm.value,
        id: this.data.userToEdit?.id || ''
      };
      this.dialogRef.close(user);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}