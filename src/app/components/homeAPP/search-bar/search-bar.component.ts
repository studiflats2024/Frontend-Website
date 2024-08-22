// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-search-bar',
//   standalone: true,
//   imports: [],
//   templateUrl: './search-bar.component.html',
//   styleUrl: './search-bar.component.scss'
// })
// export class SearchBarComponent {

// }

import { Component, HostListener, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApartmentSearchService } from '../../../services/apartment-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() searchResults = new EventEmitter<any>();

  activePicker: string | null = null;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  guests: number = 1;
  showGuestsPicker: boolean = false;
  toggle:boolean=false;

  constructor(private apartmentService: ApartmentService, private router: Router,private messageService: MessageService, private apartmentSearchService: ApartmentSearchService) {}
  showPicker(picker: string) {
    // this.activePicker = picker;
    // this.showGuestsPicker = false;
    this.toggle=!this.toggle;
    this.showGuestsPicker = false;
  }
  hidePicker(picker: string) {
    // this.activePicker = picker;
    // this.showGuestsPicker = false;
    this.toggle=false;
    this.showGuestsPicker = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.search-bar');
    if (!clickedInside  ) {
      this.activePicker = null;
      this.showGuestsPicker = false;
    }
  }

  onSearchBarClick(event: Event) {
    event.stopPropagation();
  }
  onFocusGuests() {
    this.toggle=false;
    this.showGuestsPicker = !this.showGuestsPicker;
  }

  // onBlurGuests() {
  //   setTimeout(() => {
  //     this.showGuestsPicker = false;
  //   }, 200);
  // }
  onGuestsKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
       this.showGuestsPicker = !this.showGuestsPicker;
    }
  }

  selectedCity: string = '';



  selectCity(city: string): void {
    this.selectedCity = city;
    this.toggle = false; // Close the dropdown after selection
  }


  onSearchBarSubmit() {
    const pageNo = 1; // Example value
    const pageSize = 1000; // Example value
    const city = this.selectedCity;
    const checkIn = this.formatDate(this.checkInDate);
    const checkOut = this.formatDate(this.checkOutDate);
    const guestNo = this.guests;

    this.apartmentService.searchApartments(pageNo, pageSize, city, checkIn, checkOut, guestNo).subscribe(
      response => {
        console.log('Search results:', response);
        this.apartmentSearchService.setSearchResults(response);
        this.searchResults.emit(response);
        // Handle the response, display results, etc.
      },
      error => {
        console.error('Error searching for apartments:', error);
        // Handle the error
      }
    );
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}
