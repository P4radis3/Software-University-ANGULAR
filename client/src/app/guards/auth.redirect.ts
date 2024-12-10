import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthRedirectGuard {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.userService.getUser().pipe(
            map(user => {
                if (user) {
                    this.router.navigate(['/home']);
                    return false;
                } else {
                    return true;
                }
            }),
            catchError(() => {
                return of(true);
            })
        );
    }
}
