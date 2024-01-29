import { TodoService } from './service/todo.service';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { Todo } from './models/todo';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    KnobModule,
    RouterOutlet,
  ],
  providers: [TodoService],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @ViewChild('todoTask') todoTask!: NgModel;

  todos: Todo[] = [];
  checkedCounter: number = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.todos = this.todoService.getTodoList();
    if (this.todos.length > 0) {
      this.checkedCounter = parseFloat(
        (
          (this.todos.filter((todo) => todo.completed).length /
            this.todos.length) *
          100
        ).toFixed(2)
      );
    } else {
      this.checkedCounter = 0;
    }
  }

  updateTodo(e: any, todo: Todo): void {
    const updatedTodo = { ...todo, completed: e.checked };
    this.todoService.updateTodo(updatedTodo);
    this.getList();
  }

  deleteTodo(e: unknown, id: Todo['id']): void {
    this.todoService.deleteTodo(id);
    this.getList();
  }

  addTodo(): void {
    if (this.todoTask.value) {
      this.todoService.addTodo({
        id: Date.now(),
        task: this.todoTask.value,
        completed: false,
      });
      this.todoTask.reset();
      this.getList();
    }
  }
}
