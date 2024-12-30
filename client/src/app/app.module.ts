import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FooterComponent } from "./core/footer/footer.component";

import { appInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent, AuthenticateComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MatDialogModule, MatSnackBarModule, CoreModule, SharedModule, TasksModule, UserModule, AppRoutingModule, FooterComponent],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }