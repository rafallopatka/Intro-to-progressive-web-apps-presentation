import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';
import 'rxjs/Rx';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    isConnected: Observable<boolean>;

    constructor() {
       this.isConnected = Observable.merge(
            Observable.of(navigator.onLine),
            Observable.fromEvent(window, 'online').map(() => true),
            Observable.fromEvent(window, 'offline').map(() => false));
    }
}