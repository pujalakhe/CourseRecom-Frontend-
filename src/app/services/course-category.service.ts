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
      course_name: 'Business Management',
      course_img: 'assets/images/category-images/bm.png',
    },
    {
      course_id: 2,
      course_name: 'Art and Design',
      course_img: 'assets/images/category-images/ad.png',
    },
    {
      course_id: 3,
      course_name: 'Personal Development',
      course_img: 'assets/images/category-images/pd.png',
    },
    {
      course_id: 4,
      course_name: 'UI/UX Design',
      course_img: 'assets/images/category-images/uiux.png',
    },
    {
      course_id: 5,
      course_name: 'Graphic adesign',
      course_img: 'assets/images/category-images/dm.png',
    },
    {
      course_id: 6,
      course_name: 'Digital Marketing',
      course_img: 'assets/images/category-images/dm.png',
    },
    {
      course_id: 7,
      course_name: 'Web development',
      course_img: 'assets/images/category-images/wd.png',
    },
    {
      course_id: 8,
      course_name: 'Data Science',
      course_img: 'assets/images/category-images/data-science.png',
    },
  ];
  getAll() {
    return this.course_category;
  }
}
