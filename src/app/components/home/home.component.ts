import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CourseCategoryService } from '../../services/course-category.service';
import { CommonModule } from '@angular/common';
import { CourseCategory } from '../../models/course-category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  courseCategories: CourseCategory[] = [];

  courseCategoryService = inject(CourseCategoryService);
  ngOnInit() {
    this.courseCategories = this.courseCategoryService.getAll();
  }
  getBackgroundColor(index: number): string {
    // Change color based on the index or any other logic
    return index % 2 === 0 ? '#f5e9d7' : '#e1b16a';
  }
}
