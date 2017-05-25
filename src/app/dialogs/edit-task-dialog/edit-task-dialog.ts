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

    constructor(public dialogRef: MdDialogRef<EditTaskDialog>,
        @Inject(MD_DIALOG_DATA) public selectedTask: any,
        private _taskService: TaskService) {
        this.task = selectedTask[0];
        this.indexOfTask = selectedTask[1];
        console.log(this.indexOfTask);
        
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

        this.tasks[this.indexOfTask] = this.task;
        console.log(this.tasks);
        this._taskService.setTasksToLocalStorage(this.tasks);

            
    }
}