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

import { Component , EventEmitter, Output , OnInit, HostListener, ViewChild , DoCheck } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Globals, isValidEmail } from '../../../globals/global';
import { AuthComponent } from '../../auth/auth.component';
import { UserService,UserAccount } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , DoCheck {
  @Output() toggleSearchEvent = new EventEmitter<void>();
  @Output() toggleSignEvent = new EventEmitter<void>();
  userName: string = '';

  //////////////////////test/////////////////

  @ViewChild(AuthComponent) authComponent!: AuthComponent;
  
  // isLoggedIn: boolean = false;

  // showLogin() {
  //   console.log(this.authComponent)
  //   this.authComponent.show();
  // }
auth:boolean=false;
  showLogin(){
    Globals.authg=true;
    console.log('hiiiii',this.auth)
    this.auth=Globals.authg
    console.log('hiiiii',this.auth)
    // this.toggleSignEvent.emit();
     
  
  }

  ngDoCheck(): void {
    if (Globals.authg !== this.auth) {
      console.log(`Globals.authg changed from ${this.auth} to ${Globals.authg}`);
      this.auth = Globals.authg;
    }
  }

 
  logoutt(){
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userToken')


  }

  handleAuthentication(): void {
    if (this.isAuthenticated()) {
      this.logout(); // Log the user out if authenticated
    } else {
      this.showLogin(); // Show login screen if not authenticated
    }
  }


  
logout(): void {


  // const deviceToken = 'your_device_token_here'; // Replace with the actual device token
  this.userService.logout().subscribe(
    response => {

      console.log('Logout successful', response);
      localStorage.removeItem('token');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userNameUpdated')


      this.router.navigate(['/']);
      // Handle successful logout (e.g., redirect to login page)
    },
    error => {
      console.error('Logout failed', error);
      // localStorage.removeItem('token');
      // Handle logout error
    }
  );





}

  //////////////////////test/////////////////


  constructor(private userService: UserService,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.isAuthenticated();

    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.currentUserName.subscribe((name) => {
      this.userName = name;
    });
////////////////////SHARED UPDATED USERNAME FROM PROFILE
    this.userService.currentUserName.subscribe((name) => {
      this.userName = name;
    });
    if(localStorage.getItem('userNameUpdated')){
      this.userName=localStorage.getItem('userNameUpdated')||''
    }else if(localStorage.getItem('userName')&&!localStorage.getItem('userNameUpdated')){
      this.userName=localStorage.getItem('userName')||''
          
    }
  }

  toggleSearch() {
    this.toggleSearchEvent.emit();

  }


  
isLoggedIn:any;
// isAuthenticated(): boolean {

//   return !!localStorage.getItem('token');
// }

isAuthenticated(): boolean {
  const userToken = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  return !!userToken && !!userName && !!token;
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

