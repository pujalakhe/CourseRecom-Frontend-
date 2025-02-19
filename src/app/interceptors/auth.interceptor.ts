import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthData, JwtToken } from '../models/user';
import { UtilityService } from '../services/utility.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const http = inject(HttpClient);

  // Skip token for auth endpoints
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const authData = getAuthData();
  if (!authData) {
    return next(req);
  }

  // Clone request with access token
  const clonedReq = addTokenToRequest(req, authData.tokens.access);

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized error
      if (error.status === 401) {
        return handleUnauthorizedError(
          error,
          req,
          next,
          http,
          router,
          authData
        );
      }
      return throwError(() => error);
    })
  );
};

function addTokenToRequest(
  req: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleUnauthorizedError(
  error: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  http: HttpClient,
  router: Router,
  authData: AuthData
): Observable<HttpEvent<unknown>> {
  // Try to refresh the token
  return http
    .post<JwtToken>(`${UtilityService.APIbaseUrl}/token/refresh/`, {
      refresh: authData.tokens.refresh,
    })
    .pipe(
      switchMap((tokens) => {
        // Update tokens in storage
        const updatedAuthData = {
          ...authData,
          tokens,
        };
        localStorage.setItem('AUTH_DATA', JSON.stringify(updatedAuthData));

        // Retry the original request with new token
        const clonedReq = addTokenToRequest(req, tokens.access);
        return next(clonedReq);
      }),
      catchError((refreshError) => {
        // If refresh fails, clear auth data and redirect to login
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('AUTH_DATA');
        router.navigate(['/login']);
        // Allow components or guards to decide if redirection is necessary
        return throwError(() => refreshError);
      })
    );
}

function getAuthData(): AuthData | null {
  try {
    const authData = localStorage.getItem('AUTH_DATA');
    if (!authData) return null;
    return JSON.parse(authData);
  } catch (error) {
    console.error('Error parsing auth data:', error);
    return null;
  }
}
