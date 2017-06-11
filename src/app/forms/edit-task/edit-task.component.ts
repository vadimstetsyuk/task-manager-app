import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['../forms.css']
})

export class EditTaskComponent {
    task: Task;
    customDate: Date;
    isDisplayEditForm: boolean;

    constructor(private _taskService: TaskService, private _router: Router,
        private _snackBar: MdSnackBar) {
        this.task = <Task>{};
        this.isDisplayEditForm = false;
        this.customDate = new Date();
    }

    ngOnInit() {
        /* Get index of selected task from request url */
        let indexOfTask = Number(this._router.url.split('/edit/')[1]);
        this.getTaskById(indexOfTask);
    }

    /*
    * Send updated task to server throught service
    */
    submit(date: string, time: string) {
        // splitting date
        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]) - 1;
        let year = parseInt(splitedDate[2]);

        // splitting time
        let splitedTime: string[] = time.split(':');
        let hours = parseInt(splitedTime[0]);
        let minutes = parseInt(splitedTime[1]);

        this.task.start = new Date(year, month, d, hours, minutes, 0);

        this._taskService.editTask(this.task)
            .subscribe((data) => {
                this.task = data;

                this._snackBar.open('The task \"' + this.task.title + '\" was successfully edited', 'Ok', {
                    duration: 5000,
                });

                this._router.navigateByUrl('/');
            });
    }

    /*
    * Get task by if from API for autocompleting
    */
    getTaskById(_id: number) {
        this._taskService.getTaskById(_id)
            .subscribe((task) => {
                this.task = task;

                if (this.task) {
                    /* If request index of task is above then exist in tasks list */
                    let dateTimestamp = Date.parse(task.start.toString());
                    task.start = new Date(dateTimestamp);

                    this.customDate = new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate());
                    
                    this.isDisplayEditForm = true;
                }
            },
            err => {
                console.log(err);
            });
    }
}