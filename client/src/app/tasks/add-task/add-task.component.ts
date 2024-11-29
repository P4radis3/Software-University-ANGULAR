import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  minDate: string;
  maxDate: string;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const maxDate = new Date(today.setFullYear(today.getFullYear() + 5));
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  createTask(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.form.invalid) {
      return;
    }

    const { title, description, dueDate, priority, status } = this.form.value;
    this.apiService.createTask(
      title as string,
      description as string,
      new Date(dueDate as string),
      priority as string,
      status as string
    ).subscribe(() => {
      this.router.navigate(['/all-tasks']);
    });
  }
}