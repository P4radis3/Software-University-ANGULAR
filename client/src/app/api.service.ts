import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './types/task';
import { Note } from './types/note';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  createTask(title: string, description: string, dueDate: Date, priority: string, status: string) {
    return this.http.post<Task>('/api/tasks', {
      title,
      description,
      dueDate,
      priority,
      status
    });
  }

  getTasks() {
    return this.http.get<Task[]>('/api/tasks');
  }

  getOneTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`/api/tasks/${taskId}`);
  }

  getLatestTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks/latest-tasks');
  }

  editTask(taskId: string, taskData: object) {
    return this.http.put(`/api/tasks/${taskId}`, taskData);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`/api/tasks/${taskId}`);
  }

  addNote(taskId: string, text: string) {
    return this.http.post(`/api/notes/${taskId}`, { text });
  }

  getNotes(taskId: string) {
    return this.http.get<Note[]>(`/api/notes/${taskId}`);
  }

}