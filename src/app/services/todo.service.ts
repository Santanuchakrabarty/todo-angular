import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private API_URL = 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<{ todos: Todo[] }> {
    return this.http.get<{ todos: Todo[] }>(this.API_URL);
  }

  addTodo(todoText: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.API_URL}/add`, {
      todo: todoText,
      completed: false,
      userId: 1,
    });
  }

   // ✅ Update a todo
   updateTodo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.API_URL}/${id}`);
  }
}
