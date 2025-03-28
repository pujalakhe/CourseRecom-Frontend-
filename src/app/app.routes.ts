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
import { UserInterestComponent } from './components/user-interest/user-interest.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'course-detail', component: CourseDetailComponent,canActivate:[authGuard]},
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: SearchPageComponent, canActivate: [authGuard] },
  { path: 'user-interest', component: UserInterestComponent },
  { path: 'user-history', component: UserHistoryComponent },
  { path: '**', component: PageNotFoundComponent }, //wildcard
];
