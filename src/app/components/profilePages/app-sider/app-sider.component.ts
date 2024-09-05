import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-app-sider',
  templateUrl: './app-sider.component.html',
  styleUrls: ['./app-sider.component.css']
})
export class AppSiderComponent implements OnInit{



  items: any[];

  constructor(private renderer: Renderer2) {
    this.items = [
      { label: 'Personal Information', icon: 'pi pi-user', routerLink: '/user-info' },
      { label: 'My Bookings', icon: 'pi pi-book', routerLink: '/my-bookings' },
      { label: 'Wishlist', icon: 'pi pi-heart', routerLink: '/my-wishlist' },
      { label: 'Payments / Invoices', icon: 'pi pi-file'  },//, routerLink: '/payments-invoices'
      { label: 'My Documents', icon: 'pi pi-file'  },//, routerLink: '/my-documents'
      { label: 'Report Problem', icon: 'pi pi-exclamation-triangle'  },//, routerLink: '/report-problem'
      { label: 'Contact Support', icon: 'pi pi-comments'  },//, routerLink: '/contact-support'
      { label: 'Notifications', icon: 'pi pi-bell'  },//, routerLink: '/notifications'
      { label: 'Sign Out', icon: 'pi pi-sign-out'  }//, routerLink: '/sign-out'
    ];
  }
  popup!: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    // const buttonElement = document.querySelector('.pi-ellipsis-v-button') as HTMLElement;

    this.popup = width <= 700;
    console.log(this.popup)
  }

  ngOnInit() {
    // Ensure the button visibility is correct when the component is initialized
    this.onResize({ target: window });
  }

}
