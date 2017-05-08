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
var http_1 = require("@angular/http");
var TasksService = (function () {
    function TasksService(http) {
        this.http = http;
    }
    TasksService.prototype.getToDoTasks = function () {
        return this.http.get('api/tasks/todo')
            .map(function (response) { return response.json(); });
    };
    TasksService.prototype.getDoneTasks = function () {
        return this.http.get('api/tasks/done')
            .map(function (response) { return response.json(); });
    };
    TasksService.prototype.updateTaskState = function (task) {
        task.lastModification = new Date();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = "/api/tasks/" + task.id;
        return this.http
            .put(url, JSON.stringify(task), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TasksService.prototype.addNewTask = function (task) {
        task.lastModification = new Date();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = "/api/tasks";
        return this.http
            .post(url, JSON.stringify(task), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return TasksService;
}());
TasksService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map