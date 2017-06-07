import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { EditTaskDialog } from '../dialogs/edit-task-dialog/edit-task-dialog';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit {
    @Input() tasks: Task[];
    filteredTasks: Task[];
    viewType: boolean;

    constructor(private _taskService: TaskService,
        private _editTaskDialog: MdDialog) {
        this.tasks = [];
        this.viewType = false;
        this.filteredTasks = [];
    }

    ngOnInit() {
        this.filteredTasks = this.tasks;
    }

    filterTasks(filter: string) {
        this.filteredTasks = [];

        this.tasks.forEach(task => {
            if (task.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                this.filteredTasks.push(task);
        });
    }

    openEditTaskDialog(task: Task) {
        let dialogRef = this._editTaskDialog.open(EditTaskDialog, {
            height: '440px',
            width: '550px',
            data: [task, this.tasks.indexOf(task)]
        });

        dialogRef.afterClosed().subscribe(result => {
            this.tasks = this._taskService.getTasksFromLocalStorage();
        });
    }

    deleteTask(task: Task) {
        let index = this.tasks.indexOf(task);
        let indexOfFilteredTasks = this.filteredTasks.indexOf(task);

        if (index > -1) {
            this.tasks.splice(index, 1);
            this.filteredTasks.splice(indexOfFilteredTasks, 1);
        }

        this._taskService.setTasksToLocalStorage(this.tasks);
    }

    defineColorTime(task: Task): string {
        let result = "red";

        // task date
        let date = task.start.date;
        let month = task.start.month;
        let year = task.start.year;
        let hours = task.start.hours * 60;
        let minutes = task.start.minutes;
        let duration = task.duration;

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
        var otherDay = new Date(year, month - 1, date).valueOf();

        if (otherDay < today) { // 24*60*60*1000 BEFORE
            result = "red";
        } else { // Today and after
            result = "green";
        }

        return result;
    }

    toogleView() {
        this.viewType = !this.viewType;
    }
}