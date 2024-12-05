import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Task } from 'src/app/types/task';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.css']
})
export class CurrentTaskComponent implements OnInit {
  form = this.fb.group({
    text: ['', [Validators.required]],
  });
  taskId: string = '';
  task = {} as Task;
  notes: any[] = [];
newNoteText: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder) { }
  get userId(): string {
    return this.userService.user?._id || '';
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'];
      this.loadNotes();
    });
    this.apiService.getOneTask(this.taskId).subscribe((task) => {
      this.task = task;
    });
  }
  loadNotes() {
    this.apiService.getNotes(this.taskId).subscribe(
      (notes: any[]) => {
        this.notes = notes;
      }
    )
  }
  addNote(): void {
    if (this.form.invalid) {
      return;
    }
    const { text } = this.form.value;
    this.apiService.addNote(this.taskId, text!).subscribe((note) => {
      this.notes.push(note);
      this.form.reset();
      this.loadNotes();
    })
  }
  isOwner(task: Task) {
    const isUserOwner = task.userId?._id === this.userId;
    return !!isUserOwner;
  }
  deleteTask(): void {
    this.apiService.deleteTask(this.taskId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}