import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth.activate";
import { AuthRedirectGuard } from "../guards/auth.redirect";

const routes: Routes = [
    { path: 'register', component: RegisterComponent, canActivate: [AuthRedirectGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
    { path: 'my-profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

    export class UserRoutingModule { }