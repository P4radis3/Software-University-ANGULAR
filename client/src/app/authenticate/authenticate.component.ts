import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  // styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: () => { this.isAuthenticating = false; },
      error: () => { this.isAuthenticating = false; },
      complete: () => { this.isAuthenticating = false; }
    })
  }
}
