

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchVisible: boolean = false;

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    console.log(this.searchVisible );
  }


}

