import { AbstractControl } from '@angular/forms';


export function UsernameValidator(control: AbstractControl) {
  var regex = new RegExp(/admin@admin.com/gm);
  return control.value.match(regex) ? { 'custom_username': true } : null;
}
