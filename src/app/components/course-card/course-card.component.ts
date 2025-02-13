import { Component, inject, Input } from '@angular/core';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() courses: Course[] = [];
  router = inject(Router);

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

  navigateToCourseDetail(courseId: number) {
    this.router.navigate(['/course-detail'], { queryParams: { id: courseId } });
  }
}
