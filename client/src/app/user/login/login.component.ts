import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  serverError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  login(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/']);
    },
      error => {
        if (error) {
          this.serverError = error.error.message;
        }
      });
  }
}
