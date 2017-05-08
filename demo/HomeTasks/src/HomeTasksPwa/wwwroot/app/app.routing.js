"use strict";
var router_1 = require("@angular/router");
var todo_component_1 = require("./todo/todo.component");
var done_component_1 = require("./done/done.component");
var appRoutes = [
    { path: '', component: todo_component_1.TodoComponent },
    { path: 'done', component: done_component_1.DoneComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map