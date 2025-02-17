import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() selectedStar = 0;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>();
  maxRatingArr: any[] = [];
  previousSelection: number = 0;
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }
  handleMouseLeave() {
    if (this.previousSelection != 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
  }
  rating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.onRating.emit(this.selectedStar);
  }
}
