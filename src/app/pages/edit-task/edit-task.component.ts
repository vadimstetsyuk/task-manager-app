import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CustomDate } from '../../models/CustomDate';

import { MdSnackBar } from '@angular/material';


@Component({
    selector: 'edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent {
    task: Task;
    tasks: Task[];
    indexOfTask: number;
    currentDate: Date;

    constructor(private _taskService: TaskService, private _router: Router,
                private _snackBar: MdSnackBar) {
        this.task = <Task>{};
        this.currentDate = <Date>{};
    }

    ngOnInit() {
        /* Get index of selected task from request url */
        this.indexOfTask = Number(this._router.url.split('/edit/')[1]);
        this.tasks = this._taskService.getTasksFromLocalStorage();
        this.task = this.tasks[this.indexOfTask];

        /* Building currentDate of task */
        this.currentDate = new Date(this.task.start.year, this.task.start.month - 1,
            this.task.start.date, this.task.start.hours, this.task.start.minutes);

    }

    submit(date: string, time: string) {
        // splitting date
        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]);
        let year = parseInt(splitedDate[2]);

        // splitting time
        let splitedTime: string[] = time.split(':');
        let hours = parseInt(splitedTime[0]);
        let minutes = parseInt(splitedTime[1]);

        this.task.start = new CustomDate(d, month, year, hours, minutes);

        this.tasks[this.indexOfTask] = this.task;
        this._taskService.setTasksToLocalStorage(this.tasks);


        this._snackBar.open('The task \"' + this.task.title + '\" was successfully edited', 'Ok', {
            duration: 5000,
        });

        this._router.navigate(['/']);
    }
}