import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  register(username: string, email: string, password: string, rePassword: string) {
    return this.http.post<UserForAuth>('/api/register', {
      username,
      email,
      password,
      rePassword
    }).pipe(tap((user) => {
      this.user$$.next(user);
    }))
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', {
      email,
      password
    }).pipe(tap((user) => {
      this.user$$.next(user);
    }))
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(tap(() => {
      this.user$$.next(undefined);
    }))
  }

  getUser() {
    return this.http.get<UserForAuth>('/api/users').pipe(tap((user) => {
      this.user$$.next(user);
    }))
  }

  getProfile() {
    return this.http.get<UserForAuth>('/api/users/profile');
  }
}
