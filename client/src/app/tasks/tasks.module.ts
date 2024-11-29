import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AllTasksComponent,
    AddTaskComponent,
    CurrentTaskComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ],
  exports: [AllTasksComponent, AddTaskComponent, CurrentTaskComponent, EditTaskComponent]
})
export class TasksModule { }
