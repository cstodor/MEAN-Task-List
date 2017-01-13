import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TaskService {
    constructor(private _http: Http) { }

    getTasks() {
        return this._http.get('/api/tasks')
            .map(res => res.json());
    }

    addTask(newTask: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/task', JSON.stringify(newTask), { headers: headers })
            .map(res => res.json());
    }

    deleteTask(id: any) {
        return this._http.delete('/api/task/' + id)
            .map(res => res.json());
    }
}