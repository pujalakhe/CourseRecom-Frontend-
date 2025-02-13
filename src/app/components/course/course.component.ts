import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    SearchBarComponent,
    FooterComponent,
    HeaderComponent,
    CourseCardComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {}
