import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NavbarComponent, SearchBarComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {}
