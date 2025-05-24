import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  standalone: false
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; isDetails?: boolean }
  ) {}

  onConfirm(): void {
    if (!this.data.isDetails) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}