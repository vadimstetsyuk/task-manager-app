import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { Task } from '../../models/Task';


@Component({
    templateUrl: './task-dialog.html',
    styleUrls: ['./task-dialog.css']
})
export class TaskDialog {
    task: Task;

    constructor(public dialogRef: MdDialogRef<TaskDialog>, private localStorageService: LocalStorageService) {
        this.task = new Task();
    }

    submit(date: string, time: string, type: string) {
        let tasks = <Task[]>this.localStorageService.get('tasks');

        let splitedDate: string[] = date.split('.');
        let d = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]);
        let year = parseInt(splitedDate[2]);


        let splitedTime: string[] = time.split(':');
        let hours = parseInt(splitedTime[0]);
        let minutes = parseInt(splitedDate[1]);

        this.task.start = month + '.' + d + '.' + year;

        tasks.push(this.task);
        this.localStorageService.set('tasks', tasks);        
    }
}