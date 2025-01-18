import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtToken, User, UserResponse } from '../models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
          this.doLoginUser(user.email, JSON.stringify(response.tokens))
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
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();
    return expirationDate < now;
  }
  // Note:required separate endpoint to refresh token currently not available
  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    tokens = JSON.parse(tokens.refresh);
    let refreshToken = tokens.refresh;
    return this.httpClient
      .post<UserResponse>('http://localhost:8000/token/refresh/', {
        refreshToken,
      })
      .pipe(
        tap((response: UserResponse) =>
          this.storeJwtToken(JSON.stringify(response.tokens))
        )
      );
  }
}
