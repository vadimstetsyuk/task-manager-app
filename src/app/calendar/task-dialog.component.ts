import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  constructor(public dialogRef: MdDialogRef<TaskDialogComponent>,
    @Inject(MD_DIALOG_DATA) public selectedDate: any) {

  }
}