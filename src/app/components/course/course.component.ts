import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Course } from '../../models/course';

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
  popularCourses: Course[] = [];
  isLoading: boolean = false;
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    this.fetchPopularCourses();
  }
  async fetchPopularCourses() {
    this.isLoading = true;
    await this.courseService.getPopularCourses().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.popularCourses = response.popular_courses;
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
}
