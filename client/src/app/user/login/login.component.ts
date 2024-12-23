import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: [''],
    password: ['']
  });

  serverError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastService: ToastService) { }

  login(): void {
    const { email, password } = this.form.value;

    if (!email) {
      this.toastService.show('Email is required!');
      return;
    }

    if (!password) {
      this.toastService.show('Password is required!');
      return;
    }

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/']);
    },
    error => {
      if (error) {
        this.serverError = error.error.message;
        this.toastService.show(this.serverError);
      }
    });
  }
}