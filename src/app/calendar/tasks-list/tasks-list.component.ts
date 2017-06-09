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
        this.tasks = [];
        this.viewType = false;
        this.filteredTasks = [];
    }

    ngOnInit() {
        this.tasks = this._taskService.getTasksFromLocalStorage();
        this.filteredTasks = this.tasks;
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
            let routeIndex = this.tasks.indexOf(task);

            let editTaskUrl = ['/edit/' + routeIndex];

            this._router.navigate(editTaskUrl);
        }
    }

    /*
     * Delete task from list
    */
    deleteTask(task: Task) {
        let index = this.tasks.indexOf(task);
        let indexOfFilteredTasks = this.filteredTasks.indexOf(task);

        if (index > -1) {
            this.tasks.splice(index, 1);
            this.filteredTasks.splice(indexOfFilteredTasks, 1);
        }

        this._taskService.setTasksToLocalStorage(this.tasks);
    }

    /*
     * If day is yesterday or latest - color will be red
     * If day is today or tomorrow - color will be green
    */
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

    /*
     * Toogle type of dispaly tasks (card or list)
    */
    toogleView() {
        this.viewType = !this.viewType;
    }
}