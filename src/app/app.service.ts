import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  localStorageKey = 'angular-primeng-todo';

  constructor() {}

  getTodoList(): Todo[] {
    const todos = localStorage.getItem(this.localStorageKey);
    return todos ? (JSON.parse(todos) as Todo[]) : [];
  }

  addTodo(newTodo: Todo): void {
    const todos = this.getTodoList();
    todos.push(newTodo);
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodoList();
    const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex !== -1) {
      todos[todoIndex] = updatedTodo;
      localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
    }
  }

  deleteTodo(id: Todo['id']): void {
    console.log('id', id);

    const todos = this.getTodoList();
    const updatedTodos = todos.filter((todo) => {
      console.log(`todo.id: ${todo.id} !== id: ${id}`);

      return todo.id !== id;
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTodos));
  }
}
