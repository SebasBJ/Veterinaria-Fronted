import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  }

  getUsernameErrorMessage() {
    if (this.loginForm.controls['username'].hasError('required')) {
      return 'Debes ingresar un nombre de usuario';
    }

    return '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'Debes ingresar una contraseña';
    }

    return '';
  }
}
