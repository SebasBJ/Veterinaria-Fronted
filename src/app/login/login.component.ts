import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, public userService: UsersService, public router: Router) { }

  getUsernameErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'Debes ingresar un nombre de usuario';
    }
    return ''
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'Debes ingresar una contraseña';
    }

    return '';
  }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      });
  }
}
