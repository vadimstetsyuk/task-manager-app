import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Task } from '../../models/Task';


@Component({
    templateUrl: './upload-tasks-dialog.html',
    styleUrls: ['./upload-tasks-dialog.css']
})
export class UploadTasksDialog {
    tasks: Task[];

    constructor(public dialogRef: MdDialogRef<UploadTasksDialog>) {
    }
}