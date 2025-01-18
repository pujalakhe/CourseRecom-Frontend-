import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor() {}
  // Method to map error responses to user-friendly messages
  getErrorMessage(err: any): string {
    if (err.status === 0) {
      // Network error or server not reachable
      return 'Unable to connect to the server. Please check your internet connection.';
    } else if (err.status === 401) {
      // Unauthorized
      return 'Invalid credentials. Please check your email and password.';
    } else if (err.status === 500) {
      // Internal Server Error
      return 'An unexpected error occurred on the server. Please try again later.';
    } else {
      // Default fallback for unknown errors
      return err.error?.message || 'Something went wrong. Please try again.';
    }
  }
}
