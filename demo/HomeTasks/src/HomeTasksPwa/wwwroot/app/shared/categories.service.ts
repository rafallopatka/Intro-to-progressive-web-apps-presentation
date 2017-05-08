import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Category } from "./model";

@Injectable()
export class CategoriesService {

    constructor(private http: Http) { }

    getAllCategories() {
        return this.http.get('api/categories')
            .map(response => <Category[]>response.json());
    }
}