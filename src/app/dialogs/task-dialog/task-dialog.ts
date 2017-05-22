import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Task } from '../../models/Task';


@Component({
    templateUrl: './task-dialog.html',
    styleUrls: ['./task-dialog.css']
})
export class TaskDialog {
    task: Task;

    constructor(public dialogRef: MdDialogRef<TaskDialog>) {
        this.task = new Task();
    }

    submit(form: any) {
        console.log(form);
    }
}