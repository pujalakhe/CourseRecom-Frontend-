import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN ';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/login/';
  constructor() {}

  login(user: User): Observable<UserResponse> {
    return this.httpClient
      .post<UserResponse>(this.apiUrl, user)
      .pipe(
        tap((response: UserResponse) => this.doLoginUser(user.email, response.jwt_token))
      );
  }
  private doLoginUser(email: string, tokens: any) {}
  // define func to store JWT_TOKEN
}
