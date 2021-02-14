import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  private start = "Hola, "
  transform(email: string): unknown {
    return this.start + email.split("@")[0];
  }

}
