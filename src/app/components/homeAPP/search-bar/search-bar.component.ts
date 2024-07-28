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

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  activePicker: string | null = null;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  guests: number = 1;
  showGuestsPicker: boolean = false;

  showPicker(picker: string) {
    this.activePicker = picker;
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

    this.showGuestsPicker = true;
  }

  onBlurGuests() {
    setTimeout(() => {
      this.showGuestsPicker = false;
    }, 200);
  }
  onGuestsKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.showGuestsPicker = false;
    }
  }
}
