import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/signup/'; // Your Django API endpoint
  constructor(private httpClient: HttpClient) {}
  signUp(userData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.httpClient.post(this.apiUrl, userData, { headers }).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
