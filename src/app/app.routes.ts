import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CourseComponent } from './components/course/course.component';
import { authGuard } from './auth.guard';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'course-details', component: CourseDetailComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent }, //wildcard
];
