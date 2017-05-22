import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdInputContainer } from '@angular/material';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
    templateUrl: './upload-tasks-dialog.html',
    styleUrls: ['./upload-tasks-dialog.css']
})
export class UploadTasksDialog {
    tasks: Task[];

    constructor(public dialogRef: MdDialogRef<UploadTasksDialog>,
        private taskService: TaskService,
        private localStorageService: LocalStorageService) {
    }

    uploadTasks(url: MdInputContainer) {
        console.log(url._mdInputChild.value);
        let URL = url._mdInputChild.value;

        this.getTasks(URL);

        setTimeout(() => {
            this.localStorageService.set('tasks', this.tasks);
        }, 1000);
    }

    getTasks(URL) {
        this.taskService.getTasks(URL)
            .subscribe(
            tasks => this.tasks = tasks,
            err => {
                console.log(err);
            });
    }
}