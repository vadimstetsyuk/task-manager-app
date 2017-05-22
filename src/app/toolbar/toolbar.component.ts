import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {

    constructor(private _dialog: MdDialog) {}

    openTaskDialog() {
        let dialogRef = this._dialog.open(TaskDialogComponent, {
            height: '400px',
            width: '550px'
        });
    }
}