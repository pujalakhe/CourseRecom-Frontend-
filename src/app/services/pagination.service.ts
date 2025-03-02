import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}
  getPaginatedResults(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }
}
