import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

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
        private _router: Router) {
        this.viewType = false;
        this.filteredTasks = [];
    }

    ngOnInit() {
        this.getTasks();
    }

    /*
     * Filtering tasks according by input filter
    */
    filterTasks(filter: string) {
        this.filteredTasks = [];

        this.tasks.forEach(task => {
            if (task.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                this.filteredTasks.push(task);
        });
    }

    /*
     * Redirect to edit task component
    */
    openEditTaskDialog(task: Task) {
        if (this.tasks.includes(task)) {
            let editTaskUrl = ['/edit/' + task.id];

            this._router.navigate(editTaskUrl);
        }
    }

    /*
     * Delete task from list
    */
    deleteTask(task: Task) {
        let indexOfTask = this.tasks.indexOf(task);

        this._taskService.deleteTask(task.id)
            .subscribe((result) => {
                this.tasks.splice(indexOfTask, 1);
            });

        this.getTasks();
    }

    /*
     * If day is yesterday or latest - color will be red
     * If day is today or tomorrow - color will be green
    */
    defineColorTime(task: Task): string {
        let result = "red";

        // task date
        let date = task.start.getDate();
        let month = task.start.getMonth();
        let year = task.start.getFullYear();
        let hours = task.start.getHours() * 60;
        let minutes = task.start.getMinutes();
        let duration = task.duration;

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).valueOf();
        var otherDay = new Date(year, month - 1, date).valueOf();

        if (otherDay < today) { // 24*60*60*1000 BEFORE
            result = "red";
        } else { // Today and after
            result = "green";
        }

        return result;
    }

    /*
     * Toogle type of dispaly tasks (card or list)
    */
    toogleView() {
        this.viewType = !this.viewType;
    }

    /*
    * Get all tasks from server
    */
    getTasks() {
        this._taskService.getTasks()
            .subscribe((tasks) => {
                this.tasks = tasks;
                this.tasks.forEach(task => {
                    let dateTimestamp = Date.parse(task.start.toString());
                    task.start = new Date(dateTimestamp);
                });
                this.filteredTasks = this.tasks;
            },
            err => {
                console.log(err);
            });
    }
}