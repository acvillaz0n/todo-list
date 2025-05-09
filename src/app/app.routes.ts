import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todo-list/todo-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch:"full",
        redirectTo: 'todo-list'
    },
    {
        path:'todo-list',
        loadComponent: () => TodoListComponent
    },
];
