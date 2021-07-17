import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../../Models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = 'api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.todoUrl);
  }

  getTodo(id: number): Observable<ITodo> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.get<ITodo>(url);
  }

  deleteTodo(id: number): Observable<unknown> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete(url);
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.todoUrl, todo);
  }

  editTodo(todo: ITodo): Observable<ITodo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put<ITodo>(url, todo);
  }
}
