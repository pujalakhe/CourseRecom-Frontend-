import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInteractionService } from '../../services/user-interaction.service';

interface Category {
  id: string;
  name: string;
  selected: boolean;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | null;
}

@Component({
  selector: 'app-user-interest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-interest.component.html',
  styleUrls: ['./user-interest.component.scss'],
})
export class UserInterestComponent implements OnInit {
  categories: Category[] = [
    {
      id: 'Technology',
      name: 'Technology',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'Business',
      name: 'Business',
      selected: false,
    },
    {
      id: 'Science',
      name: 'Science',
      selected: false,
    },
    {
      id: 'Health & Medicine',
      name: 'Health & Medicine',
      selected: false,
    },
    {
      id: 'Arts & Humanities',
      name: 'Arts & Humanities',
      selected: false,
    },
    {
      id: 'Social Sciences',
      name: 'Social Sciences',
      selected: false,
    },
  ];

  skillLevels = ['beginner', 'intermediate', 'advanced'];
  selectedSkillLevel: string = ''; // Single skill level for all categories
  allSelected = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userInteractionService: UserInteractionService
  ) {}

  ngOnInit(): void {
    this.loadUserInterests();
  }

  private loadUserInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const savedInterestsStr = localStorage.getItem(
        `interests_${currentUser.id}`
      );

      if (savedInterestsStr) {
        const savedInterests = JSON.parse(savedInterestsStr);
        // Update categories based on saved interests
        this.categories = this.categories.map((cat) => ({
          ...cat,
          selected: savedInterests.categories.includes(cat.name),
          skillLevel: savedInterests.difficulty_level,
        }));

        // Set selected skill level
        this.selectedSkillLevel = savedInterests.difficulty_level || 'beginner';

        // Update "Select All" checkbox status
        this.allSelected = this.categories.every((cat) => cat.selected);
      }
    }
  }

  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.categories.forEach((category) => {
      category.selected = this.allSelected;
    });
  }

  toggleCategory(category: Category): void {
    category.selected = !category.selected;
    this.allSelected = this.categories.every((cat) => cat.selected);
  }

  setSkillLevel(level: string): void {
    this.selectedSkillLevel = level; // Update the global skill level
  }

  saveInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    const selectedCategories = this.categories.filter((cat) => cat.selected);
    if (selectedCategories.length === 0) {
      console.warn('No categories selected');
      return;
    }

    const payload = {
      user_id: currentUser.id,
      categories: selectedCategories.map((cat) => cat.name),
      difficulty_level: this.selectedSkillLevel || '', // Use selected difficulty or empty string
    };
    console.log(payload);
    // Save to localStorage
    localStorage.setItem(
      `interests_${currentUser.id}`,
      JSON.stringify(payload)
    );

    this.userInteractionService.saveUserInterests(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error saving interests:', error);
      },
    });
  }
}
