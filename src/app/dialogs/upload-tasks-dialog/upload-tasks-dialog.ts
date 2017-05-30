import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdInputContainer } from '@angular/material';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

import { MdSnackBar } from '@angular/material';

@Component({
    templateUrl: './upload-tasks-dialog.html',
    styleUrls: ['./upload-tasks-dialog.css']
})
export class UploadTasksDialog {
    tasks: Task[];

    constructor(public dialogRef: MdDialogRef<UploadTasksDialog>,
        private taskService: TaskService,
        public snackBar: MdSnackBar) {
    }

    uploadTasks(url: MdInputContainer) {
        let URL = url._mdInputChild.value;

        this.getTasks(URL);

        setTimeout(() => {
            this.taskService.setTasksToLocalStorage(this.tasks);
        }, 500);

        this.snackBar.open('The tasks successfully uploaded', 'Ok', {
            duration: 5000,
        });
    }

    getTasks(URL) {
        this.taskService.getTasks(URL)
            .subscribe(
            tasks => this.tasks = tasks,
            err => {
                // console.log(err);
            });
    }
}