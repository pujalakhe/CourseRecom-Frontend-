import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchBarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {}
