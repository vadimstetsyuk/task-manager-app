import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CustomDate } from '../../models/CustomDate';

@Component({
    templateUrl: './edit-task-dialog.html',
    styleUrls: ['./edit-task-dialog.css']
})
export class EditTaskDialog implements OnInit {
    task: Task;
    tasks: Task[];
    indexOfTask: number;
    currentDate: Date;

    constructor(public dialogRef: MdDialogRef<EditTaskDialog>,
        @Inject(MD_DIALOG_DATA) public selectedTask: any,
        private _taskService: TaskService) {
        this.task = selectedTask[0];
        this.indexOfTask = selectedTask[1];
        this.currentDate = <Date>{};
    }

    ngOnInit() {
        this.tasks = this._taskService.getTasksFromLocalStorage();
        this.currentDate = new Date(Number(this.task.start.year), Number(this.task.start.month) - 1, Number(this.task.start.date), Number(this.task.start.hours), Number(this.task.start.minutes))
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

        this.tasks[this.indexOfTask] = this.task;
        this._taskService.setTasksToLocalStorage(this.tasks);


    }
}