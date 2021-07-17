import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../commons/services/dialog/dialog.service';
import { ITodo } from 'src/app/Models/todo';
import { TodoService } from '../../commons/services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  dataSource!: MatTableDataSource<ITodo>;
  displayedColumns = ['id', 'name', 'dateCreated', 'status', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  loading: boolean = true;

  constructor(
    private todoService: TodoService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.dataSource = new MatTableDataSource<ITodo>(this.todos);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deleteTodo(id: number) {
    this.dialogService
      .openDialog('Do you want delete this todo!')
      .subscribe((result) => {
        if (result === true) {
          this.todos = this.todos.filter((t) => t.id !== id);
          this.dataSource.data = this.todos;
          this.todoService.deleteTodo(id).subscribe();
        }
      });
  }
}
