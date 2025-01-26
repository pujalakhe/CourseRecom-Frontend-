import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../models/user';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}
  signUp(userData: User): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<UserResponse>(
      UtilityService.APIbaseUrl + '/signup',
      userData,
      {
        headers,
      }
    );
  }
}
// Note:
//   return this.httpClient.post<UserResponse>(
//     UtilityService.APIbaseUrl + '/signup',
//     userData,
//     {
//       headers,
//     }
//   ); is same as
//    return this.httpClient
//         .post<UserResponse>('http://localhost:8000/signup/', user)
//         .pipe(
//           tap((response: UserResponse) =>
//             this.doLoginUser(user.email, JSON.stringify(response.tokens))
//           )
//         );
