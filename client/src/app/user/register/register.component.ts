import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: [''],
    email: [''],
    passGroup: this.fb.group({
      password: [''],
      rePassword: ['']
    })
  });

  serverError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastService: ToastService) { }

  register(): void {
    const { username, email, passGroup: { password, rePassword } = {} } = this.form.value;

    if (!username) {
      this.toastService.show('Username is required!');
      return;
    }

    if (username.length < 5) {
      this.toastService.show('Username should be at least 5 characters!');
      return;
    }

    if (!email) {
      this.toastService.show('Email is required!');
      return;
    }

    if (!password || !rePassword) {
      this.toastService.show('Passwords do not match!');
      return;
    }

    if (password.length < 5) {
      this.toastService.show('Password should be at least 5 characters!');
      return;
    }

    this.userService.register(username, email, password, rePassword).subscribe(() => {
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