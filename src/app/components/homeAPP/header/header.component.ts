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

import { Component , EventEmitter, Output , OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSearchEvent = new EventEmitter<void>();
  @Output() toggleSignEvent = new EventEmitter<void>();
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.isAuthenticated();

    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.currentUserName.subscribe((name) => {
      this.userName = name;
    });
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



@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;

  // إذا تم النقر خارج القائمة
  if (!targetElement.closest('#navbarNav')) {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {

      navbar.classList.remove('show');
    }
  }else{
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {

      navbar.classList.remove('show');
    }
  }
}



}

