import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { FilterService } from '../../services/filter.service';
import { HeaderComponent } from '../header/header.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    FilterModalComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  @ViewChild('filterModal') filterModal!: FilterModalComponent;
  activatedRoute = inject(ActivatedRoute);
  searchedInput: string | null = '';
  courses: Course[] = [];
  isLoading: boolean = false;
  isDataFound: boolean = true;
  rating: number | null = null;
  level: string | null = null;

  constructor(
    private filterService: FilterService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchedInput = param.get('search');
      if (this.searchedInput) {
        this.searchCourses();
      }
    });
  }

  searchCourses() {
    if (!this.searchedInput) return;
    this.isLoading = true;
    this.courseService
      .searchCourses(this.searchedInput, this.rating, this.level)
      .subscribe({
        next: (response) => {
          this.courses = response.results.recommendations;
          this.isDataFound = this.courses.length > 0;
        },
        error: (error) => {
          console.error('Search error', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  openFilters() {
    this.filterModal.show();
  }

  onFilterClose() {
    // Handle filter changes
    this.rating = this.filterModal.selectedRating;
    this.level = this.filterModal.selectedLevel;
    this.searchCourses();
  }
}
