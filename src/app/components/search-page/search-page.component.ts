import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  searchedInput: string | null = '';
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchedInput = param.get('search');
    });
  }
}
