import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['../forms.css']
})

export class AddTaskComponent {
    task: Task;

    constructor(private _taskService: TaskService, private _router: Router,
        private _snackBar: MdSnackBar) {
        this.task = new Task('', new Date(), 0, 2, '');
    }

    /*
    * Send new task to server throught service
    */
    submit(date: string, time: string) {
        // split date
        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]) - 1;
        let year = parseInt(splitedDate[2]);

        let splitedTime: string[] = time.split(':');
        let hours = parseInt(splitedTime[0]);
        let minutes = parseInt(splitedTime[1]);

        this.task.start = new Date(year, month, d, hours, minutes, 0);

        this._taskService.addTask(this.task)
            .subscribe((data) => {
                this.task = data;

                this._snackBar.open('The task \"' + this.task.title + '\" was successfully added', 'Ok', {
                    duration: 5000,
                });

                this._router.navigateByUrl('/');
            });
    }
}