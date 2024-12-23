import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { TasksModule } from './tasks/tasks.module';
import { ErrorComponent } from './error/error.component';
import { UserModule } from './user/user.module';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent, AuthenticateComponent],
  imports: [ BrowserModule, BrowserAnimationsModule, CoreModule, SharedModule, TasksModule, UserModule, HttpClientModule, AppRoutingModule, MatDialogModule, MatSnackBarModule],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }