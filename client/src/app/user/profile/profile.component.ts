import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {} as UserForAuth;
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.user.tasks = this.user.tasks || [];
    });
  }
}