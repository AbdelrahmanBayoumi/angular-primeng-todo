import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
];
