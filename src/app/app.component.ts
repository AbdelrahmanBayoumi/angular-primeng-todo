import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { AppService } from './app.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('todoTask') todoTask!: NgModel;

  todos: Todo[] = [];
  checkedCounter: number = 0;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.todos = this.appService.getTodoList();
    this.checkedCounter =
      (this.todos.filter((todo) => todo.completed).length / this.todos.length) *
      100;
  }

  updateTodo(e: any, todo: Todo): void {
    const updatedTodo = { ...todo, completed: e.checked };
    this.appService.updateTodo(updatedTodo);
    this.getList();
  }

  deleteTodo(e: unknown, id: Todo['id']): void {
    this.appService.deleteTodo(id);
    this.getList();
  }

  addTodo(): void {
    if (this.todoTask.value) {
      this.appService.addTodo({
        id: Date.now(),
        task: this.todoTask.value,
        completed: false,
      });
      this.todoTask.reset();
      this.getList();
    }
  }
}
