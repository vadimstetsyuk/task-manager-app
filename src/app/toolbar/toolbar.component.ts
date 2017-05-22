import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TaskDialog } from '../dialogs/task-dialog/task-dialog';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {

    constructor(private _dialog: MdDialog) {}

    openTaskDialog() {
        let dialogRef = this._dialog.open(TaskDialog, {
            height: '400px',
            width: '550px'
        });
    }
}