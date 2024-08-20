// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.scss'
// })
// export class HeaderComponent {

// }

import { Component , EventEmitter, Output , OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSearchEvent = new EventEmitter<void>();
  @Output() toggleSignEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.isLoggedIn = this.isAuthenticated();
  }

  toggleSearch() {
    this.toggleSearchEvent.emit();

  }


  showLogin(){
  this.toggleSignEvent.emit();

}
isLoggedIn:any;
isAuthenticated(): boolean {

  return !!localStorage.getItem('token');
}



}

