import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode){
      this.authService.login(email, password).subscribe(
        resData => {
          console.log(resData);
       },
        error => {
          console.log(error);
          this.error = 'An error occurred';
       }
      );
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
       },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;

       }
      );
    }
    form.reset();
  }
}
