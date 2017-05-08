import { Component, OnInit } from '@angular/core';

import { TasksService } from '../shared/tasks.service';
import { UsersService } from '../shared/users.service';
import { CategoriesService } from '../shared/categories.service';

import { Task, User, Category } from '../shared/model';


@Component({
    moduleId: module.id,
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css']
})
export class TodoComponent implements OnInit {
    public tasks: Task[];
    public users: User[];
    public categories: Category[];

    public newTaskModel: Task;

    constructor(private tasksService: TasksService,
        private usersService: UsersService,
        private categoriesService: CategoriesService) {

        this.newTaskModel = new Task();
    }

    ngOnInit() {
        this.tasksService.getToDoTasks()
            .subscribe(tasks => this.tasks = tasks);

        this.usersService.getAllUsers()
            .subscribe(users => this.users = users);

        this.categoriesService.getAllCategories()
            .subscribe(categories => this.categories = categories);
    }

    markAsCompleted(isCompleted: boolean, task: Task) {
        this.tasksService
            .updateTaskState(task)
            .subscribe(t => {});
    }

    invokeCreateTaskDialog() {
        this.newTaskModel = new Task();
        this.newTaskModel.responsibleUser = this.users[0];
        this.newTaskModel.category = this.categories[0];
    }

    saveTask() {
        this.tasksService
            .addNewTask(this.newTaskModel)
            .subscribe(task => {
                this.tasks.push(task);
            }, error => { });
    }
}