import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { DoneComponent } from './done/done.component';

const appRoutes: Routes = [
    { path: '', component: TodoComponent },
    { path: 'done', component: DoneComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);