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

  getTodo(id: number): Observable<ITodo>{
    const url = `${this.todoUrl}/${id}`;
    return this.http.get<ITodo>(url);
  }
}
