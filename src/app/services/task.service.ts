import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from '../models/Task';

@Injectable()
export class TaskService {

    constructor(private http: Http, private localStorageService: LocalStorageService) {
    }

    getTasks(url: string): Observable<Task[]> {
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTasksFromLocalStorage(): Task[] {
        return <Task[]>this.localStorageService.get('tasks');
    }

    setTasksToLocalStorage(tasks: Task[]) {
        this.localStorageService.set('tasks', tasks);
    }
}