import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdInputContainer } from '@angular/material';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';


@Component({
    templateUrl: './upload-tasks-dialog.html',
    styleUrls: ['./upload-tasks-dialog.css']
})
export class UploadTasksDialog {
    tasks: Task[];

    constructor(public dialogRef: MdDialogRef<UploadTasksDialog>,
        private taskService: TaskService) {
    }

    uploadTasks(url: MdInputContainer) {
        console.log(url._mdInputChild.value);
        let URL = url._mdInputChild.value;

        this.taskService.getTasks(URL)
            .subscribe(
            tasks => this.tasks = tasks,
            err => {
                console.log(err);
            });

            if(this.tasks) {
                console.log(this.tasks);
            }
    }
}