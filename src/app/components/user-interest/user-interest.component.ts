import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
      id: 'development',
      name: 'Development',
      selected: false,
      skillLevel: 'beginner',
    },
    { id: 'design', name: 'Design', selected: false, skillLevel: 'beginner' },
    {
      id: 'business',
      name: 'Business',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'personal-development',
      name: 'Personal Development',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'teaching',
      name: 'Teaching',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      selected: false,
      skillLevel: 'beginner',
    },
    { id: 'finance', name: 'Finance', selected: false, skillLevel: 'beginner' },
    {
      id: 'health-fitness',
      name: 'Health & Fitness',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'software',
      name: 'Software',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      selected: false,
      skillLevel: 'beginner',
    },
    {
      id: 'productivity',
      name: 'Productivity',
      selected: false,
      skillLevel: 'beginner',
    },
    { id: 'music', name: 'Music', selected: false, skillLevel: 'beginner' },
    {
      id: 'photography',
      name: 'Photography',
      selected: false,
      skillLevel: 'beginner',
    },
  ];

  skillLevels = ['beginner', 'intermediate', 'advanced'];
  allSelected = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserInterests();
  }

  private loadUserInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const userInterests = localStorage.getItem(`interests_${currentUser.id}`);
      if (userInterests) {
        const savedInterests = JSON.parse(userInterests);
        this.categories = this.categories.map((cat) => {
          const saved = savedInterests.find((s: any) => s.id === cat.id);
          return saved ? { ...cat, ...saved } : cat;
        });
        // Update allSelected based on loaded data
        this.allSelected = this.categories.every((cat) => cat.selected);
      }
    }
  }

  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.categories.forEach((category) => {
      category.selected = this.allSelected;
      if (this.allSelected && !category.skillLevel) {
        category.skillLevel = 'beginner';
      }
    });
  }

  toggleCategory(category: Category): void {
    category.selected = !category.selected;
    if (category.selected && !category.skillLevel) {
      category.skillLevel = 'beginner';
    }
    // Update allSelected based on individual selections
    this.allSelected = this.categories.every((cat) => cat.selected);
  }

  updateSkillLevel(category: Category, level: string): void {
    if (category.selected) {
      category.skillLevel = level as 'beginner' | 'intermediate' | 'advanced';
    }
  }

  saveInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    const selectedInterests = this.categories
      .filter((cat) => cat.selected)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        selected: cat.selected,
        skillLevel: cat.skillLevel,
      }));

    // Save to localStorage with user-specific key
    localStorage.setItem(
      `interests_${currentUser.id}`,
      JSON.stringify(selectedInterests)
    );
    console.log('Saved interests for user:', currentUser.id, selectedInterests);
    this.router.navigate(['/']);
    // TODO: Send to backend
  }
}
