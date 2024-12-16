import { inject, Injectable, signal } from '@angular/core';
import {
  UserInterface,
  UserLoginInterface,
  UserRegisterInterface,
} from './user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'https://api.realworld.io/api';
  private http = inject(HttpClient);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(registerUserBody: UserRegisterInterface, callback?: () => void) {
    this.http
      .post<{ user: UserInterface }>(this.baseURL + '/users', {
        user: registerUserBody,
      })
      .subscribe((response) => {
        console.log('response :>> ', response);
        localStorage.setItem('token', response.user.token);
        this.currentUserSig.set(response.user);
        callback?.();
      });
  }
  login(loginUserBody: UserLoginInterface, callback?: () => void) {
    this.http
      .post<{ user: UserInterface }>(this.baseURL + '/users/login', {
        user: loginUserBody,
      })
      .subscribe((response) => {
        console.log('response :>> ', response);
        localStorage.setItem('token', response.user.token);
        this.currentUserSig.set(response.user);
        callback?.();
      });
  }
  retrievingSession() {
    this.http.get<{ user: UserInterface }>(this.baseURL + '/user').subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.currentUserSig.set(response.user);
      },
      error: (error) => {
        console.log('error :>> ', error);
        this.currentUserSig.set(null);
      },
    });
  }
  logout(): void {
    console.log('logout');
    localStorage.removeItem('token');
    this.currentUserSig.set(null);
  }
}
