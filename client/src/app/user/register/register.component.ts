import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required]]
    }, {
      validators: [matchPasswordsValidator('password', 'rePassword')],
    })
  });

  serverError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  register(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAllAsTouched();
    })
    
    if (this.form.invalid) {
      return;
    }

    const { username, email, passGroup: { password, rePassword } = {} } = this.form.value;

    this.userService.register(username!, email!, password!, rePassword!).subscribe(() => {
      this.router.navigate(['/']);
    },
    error => {
      if (error) {
        this.serverError = error.error.message;
      }
    });
  }
}
