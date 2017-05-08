import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DoneComponent } from './done/done.component';
import { routing, appRoutingProviders } from './app.routing';
import { TasksService } from './shared/tasks.service';
import { UsersService } from './shared/users.service';
import { CategoriesService } from './shared/categories.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        TasksService,
        UsersService,
        CategoriesService
    ],
    declarations: [
        AppComponent,
        TodoComponent,
        DoneComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }