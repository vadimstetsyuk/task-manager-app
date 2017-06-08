import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CustomDate } from '../../models/CustomDate';

import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
    task: Task;
    tasks: Task[];

    constructor(private _taskService: TaskService, private _router: Router, 
                private _snackBar: MdSnackBar) {
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
        let hours = parseInt(splitedTime[0]);
        let minutes = parseInt(splitedTime[1]);

        this.task.start = new CustomDate(d, month, year, hours, minutes);

        if (!this.tasks) {
            this._taskService.setTasksToLocalStorage(<Task[]>[this.task]);
        } else {
            this.tasks.push(this.task);
            this._taskService.setTasksToLocalStorage(this.tasks);
        }

        this._snackBar.open('The task \"' + this.task.title + '\" was successfully added', 'Ok', {
            duration: 5000,
        });

        this._router.navigate(['/']);
    }
}