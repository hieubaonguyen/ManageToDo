import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  hanlerError(controlName: string, errorName: string): boolean {
    return this.todoForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.loading = true;
      setTimeout(() => {
        console.log(this.todoForm.value);
        this.compareInputDateWithCurrentDate()
          ? this.refreshForm()
          : this.setError('dateCreated', { dateIncorrect: true });
        this.loading = false;
      }, 1000);
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
