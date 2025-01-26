import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public static APIbaseUrl = 'http://localhost:8000';
  constructor() {}
}
