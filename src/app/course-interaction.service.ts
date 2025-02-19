import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityService } from './services/utility.service';

@Injectable({
  providedIn: 'root',
})
export class CourseInteractionService {
  constructor(private http: HttpClient) {}
  recordInteraction(
    userId: string,
    courseId: string,
    interactionType: 'view' | 'rate',
    rating?: number
  ): Observable<any> {
    const payload = {
      user_id: userId,
      course_id: courseId,
      interaction_type: interactionType,
      rating: rating,
    };

    return this.http.post(`${UtilityService.APIbaseUrl}/interaction/`, payload);
  }
}
