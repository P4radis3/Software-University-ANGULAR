import { FormGroup } from '@angular/forms';
import { ToastService } from '../toast.service';

export function validateTaskForm(form: FormGroup, toastService: ToastService): boolean {
    const { title, description, dueDate, priority, status } = form.value;

    if (!title) {
        toastService.show('Title is required!');
        return false;
    }

    if (!description) {
        toastService.show('Description is required!');
        return false;
    }

    if (!dueDate) {
        toastService.show('Due Date is required!');
        return false;
    }

    if (form.controls['dueDate'].errors?.['dateRange']) {
        toastService.show('Due Date is out of the allowed range!');
        return false;
    }

    if (!priority) {
        toastService.show('Priority is required!');
        return false;
    }
    
    if (!status) {
        toastService.show('Status is required!');
        return false;
    }

    return true;
}