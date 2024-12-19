import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BookingService } from '../../../services/booking.service';
import { MessagingService } from '../../../services/messaging.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent  implements OnInit {


  items!: any;
  deviceToken:any;
  constructor(private messageService: MessageService,private bookingService: BookingService,private messagingService: MessagingService) { }

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'Wishlist', routerLink: '/my-wishlist' }
    ];

    // You can request permission here if necessary
    this.messagingService.requestPermission()
      .then((token:any) => {
        console.log('Device token:', token);
        this.deviceToken=token;
         this.loadWishList();
      })
      .catch((error:any) => {
        console.error('Error getting token:', error);
      });

    // Optionally listen for incoming notifications
    this.messagingService.receiveMessage();

  }

  pageNumber:any=1;
  pageSize:any=100;
 wishList:any;
 totalData:any;
  loadWishList() {
    this.bookingService.getWishList(this.pageNumber, this.pageSize,this.deviceToken )
      .subscribe(
        (response) => {
          console.log(response)
          this.wishList = response.data;
          this.totalData=response.totalRecords;
            // Assign the response to the wishlist array
          console.log('WishList:', this.wishList);
        },
        (error) => {
          console.error('Error fetching wishlist:', error);
          // this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
        }
      );
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }


  requestNotificationPermission() {
    this.messagingService.requestPermission()
      .then((token:any) => {
        this.deviceToken = token;
        // Optionally, send the token to your backend
      })
      .catch((error:any) => {
        console.error('Error requesting permission:', error);
      });
  }

  // Optionally, receive messages in the foreground
  receiveNotifications() {
    this.messagingService.receiveMessage();
  }

  removeWish(wish_ID: string) {
    this.bookingService.removeFromWishlist(wish_ID).subscribe({
      next: (response) => {
        console.log('Item successfully removed:', response);
        this.loadWishList();

      },
      error: (error) => {
        console.error('Error removing item:', error);
      }
    });
  }

}
