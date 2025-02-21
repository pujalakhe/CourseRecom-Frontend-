import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { UserInterest } from '../models/user';
export interface CourseInteraction {
  course_name: string;
  interaction_type: string;
  rating: number;
  timestamp: string;
  course_id: string;
}

export interface InteractionHistory {
  user_id: string;
  interaction_history: CourseInteraction[];
}

@Injectable({
  providedIn: 'root',
})
export class UserInteractionService {
  constructor(private http: HttpClient) {}

  getUserHistory(userId: string): Observable<InteractionHistory> {
    return this.http.get<InteractionHistory>(
      `${UtilityService.APIbaseUrl}/interaction/history/?user_id=${userId}`
    );
  }

  saveUserInterests(data: UserInterest): Observable<any> {
    return this.http.post<any>(`${UtilityService.APIbaseUrl}/interests/`, data);
  }
}
