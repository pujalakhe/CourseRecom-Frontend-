import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CourseCategoryService } from '../../services/course-category.service';
import { CommonModule } from '@angular/common';
import { CourseCategory } from '../../models/course-category';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, SearchBarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  courseCategories: CourseCategory[] = [];

  courseCategoryService = inject(CourseCategoryService);
  router = inject(Router);
  ngOnInit() {
    this.courseCategories = this.courseCategoryService.getAll();
  }
  getBackgroundColor(index: number): string {
    // Change color based on the index or any other logic
    return index % 2 === 0 ? '#f5e9d7' : '#e1b16a';
  }
  getCategory(search: any) {
    console.log('called');

    this.router.navigate(['search'], {
      queryParams: { search: search },
    });
  }
}
