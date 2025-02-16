import { Component, OnInit } from '@angular/core';
import {
  CourseInteraction,
  UserInteractionService,
} from '../../services/user-interaction.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.scss',
})
export class UserHistoryComponent implements OnInit {
  interactions: CourseInteraction[] = [];
  isLoading = false;
  error = '';

  constructor(
    private userInteractionService: UserInteractionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isLoading = true;
      this.userInteractionService
        .getUserHistory(currentUser.id.toString())
        .subscribe({
          next: (response) => {
            this.interactions = response.interaction_history;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading history:', error);
            this.error = 'Failed to load interaction history';
            this.isLoading = false;
          },
        });
    }
  }

  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
