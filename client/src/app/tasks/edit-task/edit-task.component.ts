import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  minDate: string;
  maxDate: string;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    priority: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const maxDate = new Date(today.setFullYear(today.getFullYear() + 5));
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'];
    });

    this.apiService.getOneTask(this.taskId).subscribe((task: Task) => {
      this.form.setValue({
        title: task.title,
        status: task.status,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        priority: task.priority
      });
    });
  }

  editTask(): void {
    if (this.form.invalid) {
      return;
    }

    this.apiService.editTask(this.taskId, this.form.value).subscribe(() => {
      this.router.navigate(['/all-tasks']);
    });
  }
}