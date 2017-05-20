import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
    constructor(public dialogRef: MdDialogRef<TaskDialogComponent>) {}
}