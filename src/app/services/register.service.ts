import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/signup/'; // Your Django API endpoint
  constructor(private httpClient: HttpClient) {}
  signUp(userData: User): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<UserResponse>(this.apiUrl, userData, {
      headers,
    });
  }
}
