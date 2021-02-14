import { AbstractControl } from '@angular/forms';


export function PasswordValidator(control: AbstractControl) {
  var regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  return regex.test(control.value) ? null : { 'custom_password': true };
}
