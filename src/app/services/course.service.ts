import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CourseSearchResponse, popularCoursesResponse } from '../models/course';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  searchCourses(
    searchQuery: string,
    rating?: number | null,
    levels?: string | null,
    university?: string | null
  ): Observable<CourseSearchResponse> {
    console.log('Searching for:', searchQuery);

    let params = new HttpParams().set('name', searchQuery);
    params = rating ? params.append('min_rating', rating) : params;
    params = levels ? params.append('difficulty_level', levels) : params;
    params = university ? params.append('university', university) : params;

    return this.http.get<CourseSearchResponse>(
      UtilityService.APIbaseUrl + '/search/',
      {
        params: params,
      }
    );
  }

  getPopularCourses(): Observable<popularCoursesResponse> {
    return this.http.get<popularCoursesResponse>(
      UtilityService.APIbaseUrl + '/popular-courses/'
    );
  }
  getCourseDetailsById(courseId: any): Observable<CourseSearchResponse> {
    let params = new HttpParams().set('course_id', courseId);
    return this.http.get<CourseSearchResponse>(
      `${UtilityService.APIbaseUrl}/search/`,
      { params: params }
    );
  }

  getContentBasedRecommendations(
    userId: string
  ): Observable<CourseSearchResponse> {
    return this.http.get<CourseSearchResponse>(
      `${UtilityService.APIbaseUrl}/recommend/`,
      {
        params: new HttpParams().set('user_id', userId),
      }
    );
  }

  
}
