import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  { path: 'all-tasks', component: AllTasksComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'current-task/:taskId', component: CurrentTaskComponent },
  { path: 'edit-task/:taskId', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }