import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    { id: 'all', name: 'All', selected: false },
    { id: 'development', name: 'Development', selected: false },
    { id: 'design', name: 'Design', selected: false },
    { id: 'business', name: 'Business', selected: false },
    {
      id: 'personal-development',
      name: 'Personal Development',
      selected: false,
    },
    { id: 'teaching', name: 'Teaching', selected: false },
    { id: 'marketing', name: 'Marketing', selected: false },
    { id: 'finance', name: 'Finance', selected: false },
    { id: 'health-fitness', name: 'Health & Fitness', selected: false },
    { id: 'software', name: 'Software', selected: false },
    { id: 'lifestyle', name: 'Lifestyle', selected: false },
    { id: 'productivity', name: 'Productivity', selected: false },
    { id: 'music', name: 'Music', selected: false },
    { id: 'photography', name: 'Photography', selected: false },
  ];

  skillLevels = ['beginner', 'intermediate', 'advanced', 'conversant'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleCategory(category: Category): void {
    if (category.id === 'all') {
      const allSelected = !category.selected;
      this.categories.forEach((cat) => {
        cat.selected = allSelected;
      });
    } else {
      category.selected = !category.selected;
      // Update 'All' category based on other selections
      const allCategory = this.categories.find((cat) => cat.id === 'all');
      if (allCategory) {
        allCategory.selected = this.categories
          .filter((cat) => cat.id !== 'all')
          .every((cat) => cat.selected);
      }
    }
  }

  updateSkillLevel(category: Category, level: string): void {
    category.skillLevel = level as 'beginner' | 'intermediate' | 'advanced';
  }

  saveInterests(): void {
    const selectedInterests = this.categories
      .filter((cat) => cat.selected && cat.id !== 'all')
      .map((cat) => ({
        category: cat.name,
        skillLevel: cat.skillLevel || 'beginner',
      }));

    console.log('Selected interests:', selectedInterests);
    this.router.navigate(['/']);
    // TODO: Send to backend
  }
}
