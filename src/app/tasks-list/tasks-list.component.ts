import { Component, Input} from '@angular/core';
import { Task } from '../models/Task';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent {
    @Input() tasks: Task[];

    constructor() {
        this.tasks = [];
    }
}