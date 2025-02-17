import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { StarRatingComponent } from "../star-rating/star-rating.component";

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoaderComponent, StarRatingComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  courseId: string | null = null;
  courseDetail: Course[] = [];
  isLoading = false;
  error = '';
  activeTab = 'overview';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
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
        console.log(res.results.recommendations);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);

        this.error = err.message || 'Failed to load course details';
        this.isLoading = false;
      },
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

  formatRating(rating: number | null): string {
    return rating ? rating.toFixed(1) : 'No ratings yet';
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
