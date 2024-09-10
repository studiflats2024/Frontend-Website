import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent  implements OnInit {


  items!: any;
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'Wishlist', routerLink: '/my-wishlist' }
    ];
    this.loadWishList();

  }

  pageNumber:any=1;
  pageSize:any=100;
 wishList:any;
  loadWishList() {
    this.bookingService.getWishList(this.pageNumber, this.pageSize,'' )
      .subscribe(
        (response) => {
          this.wishList = response;  // Assign the response to the wishlist array
          console.log('WishList:', this.wishList);
        },
        (error) => {
          console.error('Error fetching wishlist:', error);
        }
      );
  }

}
