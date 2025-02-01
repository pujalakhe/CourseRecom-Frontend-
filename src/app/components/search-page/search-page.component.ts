import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { FilterService } from '../../services/filter.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    FilterModalComponent,
    HeaderComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  @ViewChild('filterModal') filterModal!: FilterModalComponent;
  activatedRoute = inject(ActivatedRoute);
  searchedInput: string | null = '';
  constructor(private filterService: FilterService) {}
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchedInput = param.get('search');
    });
  }

  openFilters() {
    this.filterModal.show();
  }

  onFilterClose() {
    // Handle filter changes
    const filters = {
      rating: this.filterModal.selectedRating,
      level: this.filterModal.selectedLevel,
      university: this.filterModal.selectedUniversity,
      sort: this.filterModal.selectedSort,
    };

    this.filterService.updateFilters(filters);
  }
}
