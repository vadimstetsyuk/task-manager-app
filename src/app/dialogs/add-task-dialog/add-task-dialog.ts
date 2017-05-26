import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Task } from '../../models/Task';
import { CustomDate } from '../../models/CustomDate';
import { TaskService } from '../../services/task.service';

@Component({
    templateUrl: './add-task-dialog.html',
    styleUrls: ['./add-task-dialog.css']
})
export class AddTaskDialog {
    task: Task;

    constructor(public dialogRef: MdDialogRef<AddTaskDialog>,
        private _taskService: TaskService) {
        this.task = new Task('', <CustomDate>{}, '', 2, '');
    }

    submit(date: string, time: string) {
        let tasks = this._taskService.getTasksFromLocalStorage();

        // split date
        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]);
        let year = parseInt(splitedDate[2]);

        let splitedTime: string[] = time.split(':');
        let hours = splitedTime[0];
        let minutes = splitedTime[1];

        this.task.start = new CustomDate(d, month, year, hours, minutes);

        console.log(this.task);
        tasks.push(this.task);
        this._taskService.setTasksToLocalStorage(tasks);
    }
}