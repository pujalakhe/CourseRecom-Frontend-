import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseSearchResponse } from '../models/course';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  searchCourses(
    searchQuery: string,
    rating?: number | null,
    levels?: string | null
  ): Observable<CourseSearchResponse> {
    console.log('Searching for:', searchQuery);

    let params = new HttpParams().set('name', searchQuery);
    params = rating ? params.append('min_rating', rating) : params;
    params = levels ? params.append('difficulty_level', levels) : params;

    return this.http.get<CourseSearchResponse>(
      UtilityService.APIbaseUrl + '/search/',
      {
        params: params,
      }
    );
  }
}
