import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserResponse } from '../models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UtilityService } from './utility.service';

interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_DATA = 'AUTH_DATA'; // Single key for all auth data
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  private httpClient = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  login(user: User, url: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(UtilityService.APIbaseUrl + `${url}`, user)
      .pipe(
        tap((response: LoginResponse) => {
          this.doLoginUser(response);
        })
      );
  }
  private doLoginUser(response: LoginResponse) {
    this.loggedUser = response.user.email;
    this.storeAuthData(response);
    this.isAuthenticatedSubject.next(true);
  }

  private storeAuthData(authData: LoginResponse) {
    localStorage.setItem(this.AUTH_DATA, JSON.stringify(authData));
  }

  private getAuthData(): LoginResponse | null {
    try {
      const data = localStorage.getItem(this.AUTH_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting auth data:', error);
      return null;
    }
  }

  logout() {
    // Get current user before removing auth data
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // Remove user-specific interests
      localStorage.removeItem(`interests_${currentUser.id}`);
    }

    localStorage.removeItem(this.AUTH_DATA);

    this.loggedUser = undefined;
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    const authData = this.getAuthData();
    return !!authData;
  }

  getCurrentUser(): LoginResponse['user'] | null {
    try {
      const authData = this.getAuthData();
      return authData ? authData.user : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  getTokens(): LoginResponse['tokens'] | null {
    try {
      const authData = this.getAuthData();
      return authData ? authData.tokens : null;
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  }

  isTokenExpired() {
    try {
      const tokens = this.getTokens();
      if (!tokens) return true;

      const decoded = jwtDecode(tokens.access);
      if (!decoded.exp) return true;

      const expirationDate = decoded.exp * 1000;
      const now = new Date().getTime();
      return expirationDate < now;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  refreshToken() {
    const tokens = this.getTokens();
    if (!tokens) return;

    return this.httpClient
      .post<LoginResponse>(UtilityService.APIbaseUrl + '/token/refresh/', {
        refresh: tokens.refresh,
      })
      .pipe(
        tap((response) => {
          // Update tokens while preserving user data
          const currentAuthData = this.getAuthData();
          if (currentAuthData) {
            this.storeAuthData({
              ...currentAuthData,
              tokens: response.tokens,
            });
          }
        })
      );
  }
}
