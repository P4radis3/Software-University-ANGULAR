import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  form!: FormGroup;
  minDate: string;
  maxDate: string;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
    this.maxDate = nextYear.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', [Validators.required, this.dateRangeValidator.bind(this)]],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const minDate = new Date(this.minDate);
    const maxDate = new Date(this.maxDate);

    if (date < minDate || date > maxDate) {
      return { dateRange: true };
    }
    return null;
  }

  createTask(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) { return; }

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