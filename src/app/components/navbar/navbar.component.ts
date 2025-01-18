import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();

    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
