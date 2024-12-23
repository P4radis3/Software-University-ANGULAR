import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastService } from 'src/app/shared/toast.service';
import { ActivatedRoute } from '@angular/router';

import { validateTaskForm } from 'src/app/shared/utils/validation.utils';


@Component({
  selector: 'app-add-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {
  form!: FormGroup;
  minDate: string;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 5));
    this.maxDate = nextYear.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', [Validators.required, this.dateRangeValidator(this.minDate, this.maxDate)]],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  dateRangeValidator(minDate: string, maxDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (!datePattern.test(date)) {
        return { invalidDateFormat: true };
      }

      const dateObj = new Date(date);
      const minDateObj = new Date(minDate);
      const maxDateObj = new Date(maxDate);

      if (isNaN(dateObj.getTime())) {
        return { invalidDate: true };
      }

      if (dateObj < minDateObj || dateObj > maxDateObj) {
        return { dateRange: true };
      }

      return null;
    };
  }


  editTask(): void {
    if (!validateTaskForm(this.form, this.toastService)) {
      return;
    }

    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.apiService.editTask(taskId, this.form.value).subscribe(() => { this.router.navigate(['/all-tasks']); });
    } else {
      this.toastService.show('Invalid Task!');
    }
    this.router.navigate(['/all-tasks']);
  }
}