import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.userService.getUser().pipe(
            map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }),
            catchError(() => {
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
