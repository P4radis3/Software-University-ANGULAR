import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../types/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatestTasks().subscribe((tasks) => {
      this.tasks = tasks || [];
    });
  }
}
