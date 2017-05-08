"use strict";
var Category = (function () {
    function Category() {
    }
    return Category;
}());
exports.Category = Category;
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Task = (function () {
    function Task() {
        this.category = new Category();
        this.responsibleUser = new User();
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=model.js.map