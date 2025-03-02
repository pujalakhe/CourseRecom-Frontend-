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
    { value: 2.6, stars: 3, label: '2.6 & up' },
    { value: 1.5, stars: 2, label: '1.5 & up' },
  ];

  levels = ['Beginner', 'Intermediate', 'Advanced'];

  universities = [
    'University of Michigan',
    'Michigan State University',
    'Google Cloud',
    'University of Washington',
    'Rice University',
    'The Chinese University of Hong Kong',
    'University of Washington',
  ];

  selectedRating: number | null = null;
  selectedLevel: string | null = null;
  selectedUniversity: string | null = null;

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
}
