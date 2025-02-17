import { Component, OnInit } from '@angular/core';
import { TodoService  } from '../services/todo.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Todo } from '../services/todo.service'; 
// interface Todo {
//   id: number;
//   todo: string;
//   completed: boolean;
//   userId: number;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pending: Todo[] = [];
  inProgress: Todo[] = [];
  completed: Todo[] = [];
  addingTodo = { pending: false, inProgress: false, completed: false };
  newTodoText = '';
  editingTodoId: number | null = null; // Track the item being edited

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((response) => {
      this.pending = response.todos.filter((t) => !t.completed);
      this.completed = response.todos.filter((t) => t.completed);
    });
  }

  addTodo() {
    if (!this.newTodoText.trim()) return;
    this.todoService.addTodo(this.newTodoText).subscribe((newTodo) => {
      this.pending.push(newTodo);
      this.newTodoText = '';
      this.addingTodo.pending = false;
    });
  }

   // ✅ Start Editing Mode
  startEditing(todo: any) {
    this.editingTodoId = todo.id;
  }

  // ✅ Update Todo
  updateTodo(todo: any) {
    this.todoService.updateTodo(todo.id, { todo: todo.todo }).subscribe(() => {
      this.editingTodoId = null; // Exit edit mode
    });
  }


  deleteTodo(todo: Todo, list: Todo[]) {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      const index = list.indexOf(todo);
      if (index > -1) list.splice(index, 1);
    });
  }

  toggleAddInput(status: string) {
    this.addingTodo[status as keyof typeof this.addingTodo] = !this.addingTodo[status as keyof typeof this.addingTodo];
  }

  moveTodoBetweenLists(todo: Todo, targetList: Todo[]) {
    this.pending = this.pending.filter((t) => t.id !== todo.id);
    this.completed = this.completed.filter((t) => t.id !== todo.id);
    targetList.push(todo);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
