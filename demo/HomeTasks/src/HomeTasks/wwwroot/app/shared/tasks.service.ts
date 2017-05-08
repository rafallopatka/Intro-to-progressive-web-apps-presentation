import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Task } from "./model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TasksService {

    constructor(private http: Http) { }

    getToDoTasks() {
        return this.http.get('api/tasks/todo')
            .map(response => <Task[]>response.json());
    }

    getDoneTasks() {
        return this.http.get('api/tasks/done')
            .map(response => <Task[]>response.json());
    }

    updateTaskState(task: Task): Observable<Task>  {
        task.lastModification = new Date();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `/api/tasks/${task.id}`;
        return this.http
            .put(url, JSON.stringify(task), { headers: headers })
            .map(res => res.json() as Task);
    }

    addNewTask(task: Task): Observable<Task> {
        task.lastModification = new Date();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `/api/tasks`;
        return this.http
            .post(url, JSON.stringify(task), { headers: headers })
            .map(res => res.json() as Task);

    }
}