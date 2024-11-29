import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllTasksComponent } from "./all-tasks/all-tasks.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { CurrentTaskComponent } from "./current-task/current-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { AuthGuard } from "../guards/auth.activate";
import { TaskGuard } from "../guards/task.activate";

const routes: Routes = [
    {
        path: 'all-tasks', children: [
            { path: '', pathMatch: 'full', component: AllTasksComponent },
            { path: ':taskId', component: CurrentTaskComponent },
            { path: ':taskId/edit', component: EditTaskComponent, canActivate: [TaskGuard] }
        ]
    },
    {
        path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}