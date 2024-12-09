import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-apply-value',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './apply-value.component.html',
  styleUrl: './apply-value.component.scss'
})
export class ApplyValueComponent {
  constructor(
    private dialogRef: MatDialogRef<ApplyValueComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; isBoard: boolean; darkMode: boolean },
  ) {}

  apply(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
