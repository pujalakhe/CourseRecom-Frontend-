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
  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser?.id) {
        this.currentUserId = currentUser.id.toString();
        this.fetchRecommendedCourses();
      } else {
        // Fallback to popular courses if user ID is not available
        this.error = 'Unable to load user data';
        this.fetchPopularCourses();
      }
    } else {
      this.fetchPopularCourses();
    }
  }
  async fetchPopularCourses() {
    this.isLoading = true;
    await this.courseService.getPopularCourses().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.courses = response.popular_courses;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  fetchRecommendedCourses() {
    if (!this.currentUserId) {
      this.error = 'User ID not available';
      this.fetchPopularCourses();
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.courseService
      .getContentBasedRecommendations(this.currentUserId)
      .subscribe({
        next: (response) => {
          this.courses = response.results.recommendations;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching recommended courses:', error);
          // this.error = 'Failed to load recommended courses';
          // Fallback to popular courses if recommendations fail
          this.fetchPopularCourses();
        },
      });
  }
}
