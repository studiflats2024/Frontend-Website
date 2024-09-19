import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BookingService } from '../../../services/booking.service';


@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {


  bookings: any[] = [];
  showNoBookingAlert: boolean = false;

  constructor(private bookingService: BookingService) { }

  items!: any;

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My bookings', routerLink: '/my-bookings' }
    ];
    this.fetchBookingList(); // Example parameters
  }

  fetchBookingList(): void {
    this.bookingService.getBookings().subscribe(
      (response) => {
        this.bookings = response;
        console.log(this.bookings,response)
        // if (response && response.data && response.data.length > 0 && response.data[0] !== null) {
          if (response.length > 0 ) {

          this.bookings = response;
          this.showNoBookingAlert = false; // Hide the alert if bookings are found
        } else {
          this.showNoBookingAlert = true; // Show the alert if no bookings are found
        }
      },
      (error) => {
        console.error('Error fetching booking list:', error);
        this.showNoBookingAlert = true; // Show alert in case of error
      }
    );
  }

}
