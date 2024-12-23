import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastService } from 'src/app/shared/toast.service';

import { validateTaskForm } from 'src/app/shared/utils/validation.utils';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  form!: FormGroup;
  minDate: string;
  maxDate: string;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private toastService: ToastService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 5));
    this.maxDate = nextYear.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.form = this.fb.group({ title: ['', Validators.required], description: ['', Validators.required], dueDate: ['', [Validators.required, this.dateRangeValidator(this.minDate, this.maxDate)]], priority: ['', Validators.required], status: ['', Validators.required]
    });
  }

  dateRangeValidator(minDate: string, maxDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (!datePattern.test(date)) { return { invalidDateFormat: true }; }

      const dateObj = new Date(date);
      const minDateObj = new Date(minDate);
      const maxDateObj = new Date(maxDate);

      if (isNaN(dateObj.getTime())) { return { invalidDate: true }; }
      if (dateObj < minDateObj || dateObj > maxDateObj) { return { dateRange: true }; }
      return null;
    };
  }

  createTask(): void {
    if (!validateTaskForm(this.form, this.toastService)) { return; }

    const { title, description, dueDate, priority, status } = this.form.value;
    this.apiService.createTask(title, description, new Date(dueDate), priority, status).subscribe(() => {
      this.router.navigate(['/all-tasks']);
    });
  }
}