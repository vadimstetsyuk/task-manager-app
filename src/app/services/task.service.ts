import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_NAME } from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from '../models/Task';

@Injectable()
export class TaskService {

    constructor(private http: Http) {
    }

    getTasks(): Observable<Task[]> {
        let url = SERVER_NAME + 'tasks';

        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTaskById(_id: number): Observable<Task> {
        let url = SERVER_NAME + 'tasks/' + _id;

        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTasksByDate(day: number, month: number, year: number) : Observable<Task[]> {
        let url = SERVER_NAME + 'schedule/' + year + '/' + month + '/' + day;

        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addTask(_task: Task): Observable<Task> {
        let body = JSON.stringify(_task);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = SERVER_NAME + 'tasks';

        return this.http.post(url, body, options)
            .map(res => <Task>res.json())
            .catch(this.handleError);
    }

    editTask(_newTask: Task): Observable<Task> {
        let body = JSON.stringify(_newTask);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = SERVER_NAME + 'tasks/' + _newTask.id;

        return this.http.put(url, body, options)
            .map(res => <Task>res.json())
            .catch(this.handleError);
    }

    deleteTask(_id: number): Observable<Task> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = SERVER_NAME + 'tasks/' + _id;

        return this.http.delete(url, options)
            .map(res => <Task>res.json())
            .catch(this.handleError);
    }

    private handleError(err: any): Observable<string> {
        let message: string;
        if (err.message) {
            message = err.message;
        } else {
            message = (err.status) ?
                `${err.status} : ${err.statusText}` :
                'Server connection error';
        }

        console.error(message);
        return Observable.throw(message);
    }
}