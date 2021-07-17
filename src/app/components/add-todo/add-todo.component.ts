import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/commons/services/todo/todo.service';
import { customValidator } from '../../commons/validate/CustomValidate';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  options = ['Complete', 'Not Complete'];
  loading = false;

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
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hanlerError(controlName: string, errorName: string): boolean {
    return this.todoForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.loading = true;
      if (this.compareInputDateWithCurrentDate()) {
        this.todoService.createTodo(this.todoForm.value).subscribe();
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
