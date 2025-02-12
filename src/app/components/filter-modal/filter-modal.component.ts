import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent {
  @Output() close = new EventEmitter<void>();
  
  isVisible = false;

  ratings = [
    { value: 4.5, stars: 5, label: '4.5 & up' },
    { value: 4, stars: 4, label: '4.0 & up' },
    { value: 3, stars: 3, label: '3.0 & up' },
  ];

  levels = ['Beginner', 'Intermediate', 'Advanced'];

  universities = [
    'Harvard University',
    'MIT',
    'Stanford University',
    'Oxford University',
    'Cambridge University',
  ];

  sortOptions = ['Relevance', 'Upload date', 'Rating', 'Popularity'];

  selectedRating: number | null = null;
  selectedLevel: string | null = null;
  selectedUniversity: string | null = null;
  selectedSort: string | null = null;

  show() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  selectRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? null : rating;
  }

  selectLevel(level: string) {
    this.selectedLevel = this.selectedLevel === level ? null : level;
  }

  selectUniversity(university: string) {
    this.selectedUniversity =
      this.selectedUniversity === university ? null : university;
  }

  selectSort(sort: string) {
    this.selectedSort = this.selectedSort === sort ? null : sort;
  }
}
