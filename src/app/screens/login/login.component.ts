import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/validators/validator-password';
import { AuthService } from 'src/app/services/auth.service';
import { UsernameValidator } from 'src/app/validators/validator-username';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errors: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    var remember = this.auth.getRemember();

    this.form = new FormGroup({
      username: new FormControl(remember.username, [
        Validators.required,
        Validators.email,
        UsernameValidator
      ]),
      password: new FormControl(remember.password, [Validators.required, PasswordValidator]),
      remember: new FormControl(remember.remember)
    });
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(u => {
        if (u) {
          u.remember = this.form.value.remember;
          if (u.remember) this.auth.remember(u);
          else this.auth.notremember();
          this.auth.saveToken(u.token);
          this.router.navigate(["/home"]);
        } else {
          this.errors = "Credentials not valid";
        }
      });
    } else {
      if (this.form.get("username").errors?.email) this.errors = "* Username must be a valid email";
      else if (this.form.get("username").errors?.required) this.errors = "* Username is required";
      else if (this.form.get("username").errors?.custom_username) this.errors = "* Username cannot be admin@admin.com";

      else if (this.form.get("password").errors?.required) this.errors = "* Password is required";
      else if (this.form.get("password").errors?.custom_password) this.errors = "* Password must be at least 1 digit, 1 uppercase letter, 1 lowercase letter and 8 characters length";
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

}
