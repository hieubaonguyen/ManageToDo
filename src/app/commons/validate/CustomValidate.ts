import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function customValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {regexValidate: {value: control.value}} : null;
  };
}
