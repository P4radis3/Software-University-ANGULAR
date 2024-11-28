import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate {

  constructor(private userService: UserService, private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const taskId = route.params['taskId'];

    return this.userService.getUser().pipe(
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/']);
          return of(false);
        }

        const userId = user._id;

        return this.apiService.getOneTask(taskId).pipe(
          map(task => {
            if (user && task.userId._id === userId) {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}