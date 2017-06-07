import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/Task';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit {
    @Input() tasks: Task[];
    filteredTasks: Task[];
    viewType: boolean;

    constructor() {
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
            if(task.title.toLocaleLowerCase().includes(filter))
                this.filteredTasks.push(task);
        });
    }

    toogleView() {
        this.viewType = !this.viewType;
    }
}