import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserResponse } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/login/';
  constructor() {}
  router = inject(Router);

  login(user: User): Observable<UserResponse> {
    return this.httpClient
      .post<UserResponse>(this.apiUrl, user)
      .pipe(
        tap((response: UserResponse) =>
          this.doLoginUser(user.email, response.tokens.access)
        )
      );
  }
  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }
  // define func to store JWT_TOKEN
  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
