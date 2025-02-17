// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoService, Todo } from './services/todo.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
 
  }

  
}