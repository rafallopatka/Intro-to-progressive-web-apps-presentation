"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tasks_service_1 = require("../shared/tasks.service");
var users_service_1 = require("../shared/users.service");
var categories_service_1 = require("../shared/categories.service");
var model_1 = require("../shared/model");
var TodoComponent = (function () {
    function TodoComponent(tasksService, usersService, categoriesService) {
        this.tasksService = tasksService;
        this.usersService = usersService;
        this.categoriesService = categoriesService;
        this.newTaskModel = new model_1.Task();
    }
    TodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tasksService.getToDoTasks()
            .subscribe(function (tasks) { return _this.tasks = tasks; });
        this.usersService.getAllUsers()
            .subscribe(function (users) { return _this.users = users; });
        this.categoriesService.getAllCategories()
            .subscribe(function (categories) { return _this.categories = categories; });
    };
    TodoComponent.prototype.markAsCompleted = function (isCompleted, task) {
        this.tasksService
            .updateTaskState(task)
            .subscribe(function (t) { });
    };
    TodoComponent.prototype.invokeCreateTaskDialog = function () {
        this.newTaskModel = new model_1.Task();
        this.newTaskModel.responsibleUser = this.users[0];
        this.newTaskModel.category = this.categories[0];
    };
    TodoComponent.prototype.saveTask = function () {
        var _this = this;
        this.tasksService
            .addNewTask(this.newTaskModel)
            .subscribe(function (task) {
            _this.tasks.push(task);
        }, function (error) { });
    };
    return TodoComponent;
}());
TodoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'todo.component.html',
        styleUrls: ['todo.component.css']
    }),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        users_service_1.UsersService,
        categories_service_1.CategoriesService])
], TodoComponent);
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map