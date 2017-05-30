import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Task } from '../../models/Task';
import { CustomDate } from '../../models/CustomDate';
import { TaskService } from '../../services/task.service';

@Component({
    templateUrl: './add-task-dialog.html',
    styleUrls: ['./add-task-dialog.css']
})
export class AddTaskDialog implements OnInit {
    task: Task;
    tasks: Task[];

    constructor(public dialogRef: MdDialogRef<AddTaskDialog>,
        private _taskService: TaskService) {
        this.task = new Task('', <CustomDate>{}, '', 2, '');
        this.tasks = <Task[]>{};
    }

    ngOnInit() {
        this.tasks = this._taskService.getTasksFromLocalStorage();
    }

    submit(date: string, time: string) {
        // split date
        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]);
        let year = parseInt(splitedDate[2]);

        let splitedTime: string[] = time.split(':');
        let hours = splitedTime[0];
        let minutes = splitedTime[1];

        this.task.start = new CustomDate(d, month, year, hours, minutes);

        if (!this.tasks) {
            this._taskService.setTasksToLocalStorage(<Task[]>[this.task]);
        } else {
            this.tasks.push(this.task);
            this._taskService.setTasksToLocalStorage(this.tasks);
        }
    }
}