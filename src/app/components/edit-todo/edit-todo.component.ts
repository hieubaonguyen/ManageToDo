import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/commons/services/todo/todo.service';
import { customValidator } from 'src/app/commons/validate/CustomValidate';
import { ITodo } from 'src/app/Models/todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  options = ['Complete', 'Not Complete'];
  loading: boolean = false;
  todo: ITodo | null = null;
  loadingForm: boolean = true;

  todoForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        customValidator(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/i),
      ],
    ],
    description: ['', Validators.required],
    dateCreated: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe({
      next: (todo) => (this.todo = todo),
      complete: () => {
        this.todoForm.setValue({
          name: this.todo?.name,
          description: this.todo?.description,
          dateCreated: this.todo?.dateCreated.toString().split('.')[0],
          status: this.todo?.status,
        });
        this.loadingForm = false;
      },
    });
  }

  hanlerError(controlName: string, errorName: string): boolean {
    return this.todoForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.loading = true;
      if (this.compareInputDateWithCurrentDate()) {
        this.todo = { ...this.todo!, ...this.todoForm.value! };
        this.todoService.editTodo(this.todo!).subscribe();
        this.refreshForm();
        this.router.navigate(['/']);
      } else {
        this.setError('dateCreated', { dateIncorrect: true });
      }
      this.loading = false;
    }
  }

  private compareInputDateWithCurrentDate(): boolean {
    const inputDate = new Date(
      this.todoForm.controls['dateCreated'].value
    ).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);

    return inputDate < currentDate ? false : true;
  }

  private setError(name: any, type: object): void {
    this.todoForm.controls[name].setErrors(type);
  }

  private refreshForm(): void {
    this.todoForm.setValue({
      name: '',
      dateCreated: '',
      description: '',
      status: '',
    });
  }
}
