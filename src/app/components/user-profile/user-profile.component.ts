import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  isAuthenticated = false;
  userName = '';
  userInitials = '';
  userEmail = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.updateUserInfo();
      } else {
        // Clear user info when not authenticated
        this.userName = '';
        this.userInitials = '';
        this.userEmail = '';
      }
    });

    // Initial check for user data
    if (this.authService.isLoggedIn()) {
      this.updateUserInfo();
    }
  }

  private updateUserInfo(): void {
    const userData = localStorage.getItem('AUTH_DATA');
    if (userData) {
      try {
        const authData = JSON.parse(userData);
        const user: User = authData.user;

        this.userEmail = user.email;

        if (user.first_name && user.last_name) {
          this.userName = `${user.first_name} ${user.last_name}`.trim();
          this.userInitials = (
            user.first_name.charAt(0) + user.last_name.charAt(0)
          ).toUpperCase();
        } else {
          // Fallback to email if names are not available
          this.userName = user.email;
          this.userInitials = user.email.charAt(0).toUpperCase();
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Fallback to using getCurrentUser from AuthService
        const user = this.authService.getCurrentUser();
        if (user) {
          this.userEmail = user.email;
          this.userName = user.email;
          this.userInitials = user.email.charAt(0).toUpperCase();
        }
      }
    }
  }
  signOut(): void {
    this.authService.logout();
   
  }
}
