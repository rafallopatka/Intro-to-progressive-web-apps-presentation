import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from "./model";

@Injectable()
export class UsersService {

    constructor(private http: Http) { }

    getAllUsers() {
        return this.http.get('api/users')
            .map(response => <User[]>response.json());
    }
}