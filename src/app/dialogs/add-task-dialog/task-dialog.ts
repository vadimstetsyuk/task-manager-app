import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { Task } from '../../models/Task';
import { CustomDate } from '../../models/CustomDate';

@Component({
    templateUrl: './task-dialog.html',
    styleUrls: ['./task-dialog.css']
})
export class TaskDialog {
    task: Task;

    constructor(public dialogRef: MdDialogRef<TaskDialog>,

        private localStorageService: LocalStorageService) {
        this.task = new Task('', <CustomDate>{}, '', '', '');
    }

    submit(date: string, time: string) {
        let tasks = <Task[]>this.localStorageService.get('tasks');

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
        this.localStorageService.set('tasks', tasks);
    }
}