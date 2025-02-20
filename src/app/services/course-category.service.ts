import { Injectable } from '@angular/core';
import { CourseCategory } from '../models/course-category';

@Injectable({
  providedIn: 'root',
})
export class CourseCategoryService {
  constructor() {}
  course_category: CourseCategory[] = [
    {
      course_id: 1,
      course_name: 'Technology',
      course_img: 'assets/images/category-images/bm.png',
    },
    {
      course_id: 2,
      course_name: 'Arts & Humanities',
      course_img: 'assets/images/category-images/ad.png',
    },
    {
      course_id: 3,
      course_name: 'Science',
      course_img: 'assets/images/category-images/pd.png',
    },
    {
      course_id: 4,
      course_name: 'Health and Medicine',
      course_img: 'assets/images/category-images/uiux.png',
    },
    {
      course_id: 5,
      course_name: 'Social Sciences',
      course_img: 'assets/images/category-images/dm.png',
    },
    {
      course_id: 6,
      course_name: 'Business',
      course_img: 'assets/images/category-images/dm.png',
    },
  ];
  getAll() {
    return this.course_category;
  }
}
