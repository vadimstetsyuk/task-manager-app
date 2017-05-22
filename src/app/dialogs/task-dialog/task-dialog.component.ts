import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Task } from '../../models/Task';


@Component({
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
    task: Task;

    constructor(public dialogRef: MdDialogRef<TaskDialogComponent>) {
        this.task = new Task();
    }

    submit(form: any) {
        console.log(form);
    }
}