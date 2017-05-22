import { Component, OnInit, OnChanges } from '@angular/core';
import { Task } from '../models/Task';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit, OnChanges {
    tasks: Task[];

    constructor(private localStorageService: LocalStorageService) {
        this.tasks = [];
    }

    ngOnInit() {
        this.tasks = <Task[]>this.localStorageService.get('tasks');
    }

    ngOnChanges() {
        this.tasks = <Task[]>this.localStorageService.get('tasks');
    }
}