import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [SpinnerComponent, ConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [SpinnerComponent, ConfirmationDialogComponent]
})

export class SharedModule { }