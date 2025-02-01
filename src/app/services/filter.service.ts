// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterState {
  rating: number | null;
  level: string | null;
  university: string | null;
  sort: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterState = new BehaviorSubject<FilterState>({
    rating: null,
    level: null,
    university: null,
    sort: null,
  });

  filterState$ = this.filterState.asObservable();

  updateFilters(newState: Partial<FilterState>) {
    this.filterState.next({
      ...this.filterState.value,
      ...newState,
    });
  }

  clearFilters() {
    this.filterState.next({
      rating: null,
      level: null,
      university: null,
      sort: null,
    });
  }
}
