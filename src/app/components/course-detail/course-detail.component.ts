import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../services/utility.service';
import { AuthService } from '../../services/auth.service';
import { CourseInteractionService } from '../../services/course-interaction.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    LoaderComponent,
    StarRatingComponent,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  courseId: string | null = null;
  courseDetail: Course[] = [];
  isLoading = false;
  error = '';
  useRating: number = 0;
  userId: number | null = null;
  viewTracked: boolean = false; // To track if the view has been recorded

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private http: HttpClient,
    private authService: AuthService,
    private courseInteractionService: CourseInteractionService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.queryParamMap.subscribe((params) => {
      this.courseId = params.get('id');

      if (this.courseId) {
        this.loadCourseDetails();
      } else {
        this.error = 'No course ID provided';
        this.isLoading = false;
      }
    });
  }
  loadCourseDetails() {
    this.isLoading = true;
    this.error = '';
    this.courseService.getCourseDetailsById(this.courseId).subscribe({
      next: (res) => {
        this.courseDetail = res.results.recommendations;
        this.isLoading = false;
        // Track the course view if it hasn't been tracked already
        if (!this.viewTracked) {
          console.log('called');
          this.trackCourseView();
          this.viewTracked = true; // Mark as tracked
        }
      },
      error: (err) => {
        console.log(err);

        this.error = err.message || 'Failed to load course details';
        this.isLoading = false;
      },
    });
  }

  trackCourseView() {
    const payload = {
      user_id: this.authService.getUserId(), // Get user ID from auth service
      course_id: this.courseId,
      interaction_type: 'view',
    };

    this.http
      .post(`${UtilityService.APIbaseUrl}/interaction/`, payload)
      .subscribe({
        next: () => console.log('Course view recorded'),
        error: (err) => console.error('Error recording course view:', err),
      });
  }
  starsArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return Array(5)
      .fill('fa-star-o')
      .map((_, i) =>
        i < fullStars
          ? 'fa-star'
          : i === fullStars && hasHalfStar
          ? 'fa-star-half-alt'
          : 'fa-star-o'
      );
  }

  getSkillsList(): string[] {
    return (
      this.courseDetail[0]?.skills?.split(',').map((skill) => skill.trim()) ||
      []
    );
  }
  onRatingChanged(rating: number) {
    console.log('User rated:', rating);
    this.submitRating(rating);
  }
  submitRating(rating: number) {
    const payload = {
      user_id: this.authService.getUserId(), // Get user ID from auth service
      course_id: this.courseId,
      interaction_type: 'rate',
      rating: rating,
    };
    this.http
      .post(`${UtilityService.APIbaseUrl}/interaction/`, payload)
      .subscribe({
        next: () => console.log('Course Rate recorded'),
        error: (err) => console.error('Error recording course rate:', err),
      });
  }
}
