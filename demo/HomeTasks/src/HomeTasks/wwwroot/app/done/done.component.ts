import { Component, OnInit } from '@angular/core';

import { TasksService } from '../shared/tasks.service';
import { Task } from "../shared/model";

@Component({
    moduleId: module.id,
    templateUrl: 'done.component.html',
    styleUrls: ['done.component.css']
})
export class DoneComponent implements OnInit {
    characters: string[];
    tasks: Task[];

    constructor(private tasksService: TasksService) { }

    ngOnInit() {
        this.tasksService.getDoneTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}