import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    FooterComponent,
    HeaderComponent,
    CourseCardComponent,
    LoaderComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  isLoading: boolean = false;
  error: string = '';
  isLoggedIn: boolean = false;
  currentUserId: string | null = null;
  nextPageUrl: string | null = null; // Store next page URL
  previousPageUrl: string | null = null; // Store previous page URL
  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser?.id) {
        this.fetchPopularCourses();
        return;
      }
      this.currentUserId = currentUser.id.toString();
      this.fetchRecommendedCourses();
    } else {
      this.fetchPopularCourses();
    }
  }

  fetchPopularCourses() {
    this.isLoading = true;
    this.courseService.getPopularCourses().subscribe({
      next: (res) => {
        this.courses = res.popular_courses;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.error = 'Failed to fetch courses';
      },
    });
  }

  fetchRecommendedCourses(pageUrl?: string) {
    if (!this.currentUserId) {
      this.fetchPopularCourses();
      return;
    }
    this.isLoading = true;
    this.courseService
      .getContentBasedRecommendations(this.currentUserId, pageUrl)
      .subscribe({
        next: (response) => {
          this.courses = [...this.courses, ...response.results.recommendations];
          this.nextPageUrl = response.next; // Update next page URL
          this.previousPageUrl = response.previous; // Update previous page URL
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching recommended courses:', error);
          this.fetchPopularCourses(); // Fallback to popular courses
        },
      });
  }

  loadPreviousCourses() {
    if (this.previousPageUrl) {
      this.fetchRecommendedCourses(this.previousPageUrl);
    }
  }

  loadNextCourses() {
    if (this.nextPageUrl) {
      this.fetchRecommendedCourses(this.nextPageUrl);
    }
  }
}
