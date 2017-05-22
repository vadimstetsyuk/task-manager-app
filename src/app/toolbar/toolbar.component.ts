import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TaskDialog } from '../dialogs/task-dialog/task-dialog';
import { UploadTasksDialog } from '../dialogs/upload-tasks-dialog/upload-tasks-dialog';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {

    constructor(private _taskDialog: MdDialog, private _uploadTasksDialog: MdDialog) { }

    openTaskDialog() {
        let dialogRef = this._taskDialog.open(TaskDialog, {
            height: '400px',
            width: '550px'
        });
    }

    openUploadTasksDialog() {
        let dialogRef = this._uploadTasksDialog.open(UploadTasksDialog, {
            height: '400px',
            width: '550px'
        });
    }
}