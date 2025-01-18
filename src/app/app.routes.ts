import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CourseComponent } from './components/course/course.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'search', component: SearchBarComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: PageNotFoundComponent }, //wildcard
];
