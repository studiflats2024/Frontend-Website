import { Component,OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';  // Adjust path based on your project structure
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';

interface Guest {
  bed_ID: string;
  room_ID: string;
  guest_ID: string;
  guest_Name: string;
  guest_Passport: string;
  bed_Name: string;
  room_Type: string;
  room_Name: string;
  bed_Price: number;
  secuirty_Deposit:number;
  service_Fee:number;
  guest_Mail:any;
  guest_Phone:any;
  guest_Image_Profile:any;
}

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {




  items!: any;
  items1!: any;

  bookingDetails: any;
  bookingID: string | null = null;

  constructor(private messageService: MessageService,private userService:UserService,private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {



    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My bookings', routerLink: '/my-bookings' }
    ];
    this.route.paramMap.subscribe(params => {
      this.bookingID = params.get('bookingID');
      if (this.bookingID) {
        this.fetchBookingDetails(this.bookingID);

      }
    });
    this.getProfileData();
    // this.bookingDetails={
    //   "booking_ID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   "apartment_ID": "3b8a8c91-1234-5678-9101-abcdef123456",
    //   "bed_ID": "7ea1f87b-2345-6789-9101-bdef23456789",
    //   "room_ID": "f1b8e25d-3456-7890-9101-c1234567d890",
    //   "check_In": "2024-09-08",
    //   "check_Out": "2024-09-15",
    //   "apartment_Code": "APT-12345",
    //   "apartment_Name": "Ocean View Apartment",
    //   "apartment_Location": "1234 Beach Road, City, Country",
    //   "apartment_Share_Status": "Shared",
    //   "apartment_MapLink": "https://maps.example.com/ocean-view-apartment",
    //   "apartment_Picture": "https://images.example.com/apartment/ocean-view.jpg",
    //   "booking_Code": "BOOK-98765",
    //   "full_Booking": false,
    //   "guests": [
    //     {
    //       "bed_ID": "bed001",
    //       "room_ID": "room001",
    //       "guest_ID": "guest001",
    //       "guest_Name": "John Doe",
    //       "guest_Passport": "A12345678",
    //       "guest_Image_Profile": "https://images.example.com/guests/john-doe.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": false,
    //       "extending_Status": "None",
    //       "bed_Name": "Bed A",
    //       "room_Type": "Single",
    //       "room_Name": "Room 101",
    //       "bed_Price": 100,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 20,
    //       "qR_Code": "QR-12345",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-12345.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 120,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     },
    //     {
    //       "bed_ID": "bed002",
    //       "room_ID": "room001",
    //       "guest_ID": "guest002",
    //       "guest_Name": "Jane Smith",
    //       "guest_Passport": "B23456789",
    //       "guest_Image_Profile": "https://images.example.com/guests/jane-smith.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": true,
    //       "extending_Status": "Pending",
    //       "bed_Name": "Bed B",
    //       "room_Type": "Single",
    //       "room_Name": "Room 101",
    //       "bed_Price": 100,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 20,
    //       "qR_Code": "QR-54321",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-54321.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 120,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     },
    //     {
    //       "bed_ID": "bed003",
    //       "room_ID": "room002",
    //       "guest_ID": "guest003",
    //       "guest_Name": "Michael Brown",
    //       "guest_Passport": "C34567890",
    //       "guest_Image_Profile": "https://images.example.com/guests/michael-brown.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": false,
    //       "extending_Status": "None",
    //       "bed_Name": "Bed A",
    //       "room_Type": "Double",
    //       "room_Name": "Room 102",
    //       "bed_Price": 150,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 30,
    //       "qR_Code": "QR-67890",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-67890.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 180,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     },
    //     {
    //       "bed_ID": "bed004",
    //       "room_ID": "room002",
    //       "guest_ID": "guest004",
    //       "guest_Name": "Emily White",
    //       "guest_Passport": "D45678901",
    //       "guest_Image_Profile": "https://images.example.com/guests/emily-white.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": true,
    //       "extending_Status": "Rejected",
    //       "bed_Name": "Bed B",
    //       "room_Type": "Double",
    //       "room_Name": "Room 102",
    //       "bed_Price": 150,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 30,
    //       "qR_Code": "QR-09876",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-09876.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 180,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     },
    //     {
    //       "bed_ID": "bed005",
    //       "room_ID": "room003",
    //       "guest_ID": "guest005",
    //       "guest_Name": "David Green",
    //       "guest_Passport": "E56789012",
    //       "guest_Image_Profile": "https://images.example.com/guests/david-green.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": true,
    //       "extending_Status": "Accepted",
    //       "bed_Name": "Bed A",
    //       "room_Type": "Triple",
    //       "room_Name": "Room 103",
    //       "bed_Price": 200,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 40,
    //       "qR_Code": "QR-13579",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-13579.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 220,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     },
    //     {
    //       "bed_ID": "bed006",
    //       "room_ID": "room003",
    //       "guest_ID": "guest006",
    //       "guest_Name": "Sophia Johnson",
    //       "guest_Passport": "F67890123",
    //       "guest_Image_Profile": "https://images.example.com/guests/sophia-johnson.jpg",
    //       "guest_Image_Uploaded": true,
    //       "has_Extend_Request": false,
    //       "extending_Status": "None",
    //       "bed_Name": "Bed B",
    //       "room_Type": "Triple",
    //       "room_Name": "Room 103",
    //       "bed_Price": 200,
    //       "secuirty_Deposit": 300,
    //       "service_Fee": 40,
    //       "qR_Code": "QR-97531",
    //       "qr_Code_Img": "https://images.example.com/qr-codes/qr-97531.png",
    //       "passport_Status": "Accepted",
    //       "secuirty_Paid": true,
    //       "qR_Scanned": false,
    //       "identity_Status": "Accepted",
    //       "has_Arrived": true,
    //       "contract_Signed": true,
    //       "rental_Rules_Signed": true,
    //       "handover_Signed": true,
    //       "passport_Reject_Reason": "",
    //       "arriving_Date": "2024-09-08",
    //       "pay_Later": false,
    //       "has_Secuirty_Invoice": true,
    //       "hasRent": true,
    //       "payRent": true,
    //       "monthly_Invoice": {
    //         "month_Inv_ID": "9c876b23-9876-1234-5678-abcdef987654",
    //         "inv_Date": "2024-09-01T10:00:00Z",
    //         "inv_Total": 220,
    //         "isCashed": true,
    //         "inv_Code": "INV-2024-09"
    //       }
    //     }
    //   ],
    //   "booking_Status": "Approved",
    //   "reject_Reason": "",
    //   "checkin_Details": {
    //     "uuid": "e2c12345-6789-1234-5678-abcdef678912",
    //     "apt_UUID": "3b8a8c91-1234-5678-9101-abcdef123456",
    //     "check_TypeString": "Self",
    //     "checkType": "Self_Check_In",
    //     "wifi_Name": "OceanViewWiFi",
    //     "wifi_Password": "password123",
    //     "numof_Doors": 2,
    //     "mailBox_Num": 101,
    //     "trash_Location": "Next to the main gate",
    //     "apt_Location": "1234 Beach Road, City, Country",
    //     "safe_Code": "4567",
    //     "safe_Img": "https://images.example.com/safe/safe-code.jpg",
    //     "door_Img": "https://images.example.com/door/door.jpg",
    //     "building_Img": "https://images.example.com/building/building.jpg",
    //     "apt_inputfields": [
    //       {
    //         "field_Name": "Parking",
    //         "field_Content": "Available in the basement"
    //       }
    //     ],
    //     "apt_rules": [
    //       {
    //         "rule_Desc": "No loud music after 10 PM"
    //       }
    //     ],
    //     "tarsh_Pin_Imgs": [
    //       {
    //         "pic_URL": "https://images.example.com/trash/trash-location.jpg"
    //       }
    //     ]
    //   },
    //   "is_Offered": true,
    //   "booking_Guests_No": 6
    // }
// this.guestss=this.bookingDetails.guests;
// console.log(this.guests)

// const groupedGuests = this.bookingDetails.guests.reduce((acc:any, guest:any) => {
//   if (!acc[guest.room_ID]) {
//     acc[guest.room_ID] = [];
//   }
//   acc[guest.room_ID].push(guest);
//   return acc;
// }, {} as { [room_ID: string]: any });
// this.groupedGuests=groupedGuests;

// console.log(groupedGuests);
  }
  groupedGuests: { [key: string]: Guest[] } = {};
  guestss:any;





  guests:any;
  booking:any;
  total:any;
  isChangeDatesDisabled: boolean = false;  // Initially set to true, you can change it based on your logic
  isCancelBookingDisabled: boolean = false;
  fetchBookingDetails(bookingID: string): void {
    this.bookingService.getBookingDetails(bookingID).subscribe(
      (response) => {
        console.log(response)
        // this.bookingDetails = response;
        this.bookingDetails = response;

        this.guests=this.bookingDetails?.guests;
        console.log(this.guests,this.booking);
        const groupedGuests = this.bookingDetails.guests.reduce((acc:any, guest:any) => {
          if (!acc[guest.room_ID]) {
            acc[guest.room_ID] = [];
          }
          acc[guest.room_ID].push(guest);
          return acc;
        }, {} as { [room_ID: string]: any });
        this.groupedGuests=groupedGuests;
        // Output the grouped guests
        console.log(groupedGuests);

       this.total= this.calculateTotals(groupedGuests);
       console.log(this.total)
       if(this.bookingDetails.guests[0].secuirty_Paid){
        this.isChangeDatesDisabled=true;
        this.isCancelBookingDisabled=true;
       }
       this.items1 = [
        {label: 'show apartment details', icon: 'pi pi-eye', routerLink: ['/apartment-details', this.bookingDetails.apartment_ID]},
        {label: 'change dates', icon: 'pi pi-calendar',  command: () => {
          this.showChangeDatesModal();
        },
        disabled: this.isChangeDatesDisabled},

        {label: 'cancel booking', icon: 'pi pi-times-circle',  command: () => {
          this.showCancelBookingModal();
        },
        disabled: this.isCancelBookingDisabled},

      ];

      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }

  profileData: any;
  userName:any;
  emaillogin:any;
  phonelogin:any;
getProfileData(): void {
  this.userService.getProfile().subscribe(
    data => {
      this.profileData = data;
      console.log('ProfileData :',this.profileData);
      this.userName= this.profileData[0]?.fullName;
      this.emaillogin=this.profileData[0]?.email;
      this.phonelogin=this.profileData[0]?.mobile;
      // this.authService.login(this.userName, token);
    },
    error => {
      console.error('There was an error!', error);
    }
  );
}


// Function to calculate totals
 calculateTotals(groupedGuests: { [room_ID: string]: Guest[] }) {
  let totalBedPrice = 0;
  let totalSecurityDeposit = 0;
  let totalServiceFee = 0;

  // Iterate over each room in groupedGuests
  for (const roomID in groupedGuests) {
    const guests = groupedGuests[roomID];

    // Iterate over each guest in the room
    guests.forEach((guest) => {
      totalBedPrice += guest.bed_Price;
      totalSecurityDeposit += guest.secuirty_Deposit;
      totalServiceFee += guest.service_Fee;
    });
  }
  let totalPrice=totalBedPrice+totalSecurityDeposit+totalServiceFee;

  return totalPrice;
}

changeDatesModalVisible: boolean = false;
cancelBookingModalVisible: boolean = false;

showChangeDatesModal() {
  this.changeDatesModalVisible = true;
}

showCancelBookingModal() {
  this.cancelBookingModalVisible = true;
}

cancelReason:string='';
cancelDate: Date = new Date();  // Initialize the cancel date with the current date

// Method to format the cancelDate for API use (YYYY-MM-DD)
getFormattedDate(): string {
  return this.cancelDate.toISOString().split('T')[0];  // Format date to YYYY-MM-DD
}

cancelBooking() {

  console.log(this.cancelDate)
  const req_ID = this.bookingDetails.booking_ID;  // Example request ID
  const guest_ID = this.bookingDetails.guests[0].guest_ID;  // Example guest ID
  const reason = this.cancelReason;  // Example reason
  const date = this.getFormattedDate();  // Example date

  this.bookingService.cancelRequest(req_ID, guest_ID, reason, date)
    .subscribe(
      (response) => {
        console.log('Cancellation successful', response);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'cancel booking successfully'});
      },
      (error) => {
        console.error('Error cancelling the request', error);
      }
    );
}

startDate!:Date  ;
endDate!:Date  ;
getFormattedSDate(): string {
  return this.startDate.toISOString().split('T')[0];  // Format date to YYYY-MM-DD
}
getFormattedEDate(): string {
  return this.endDate.toISOString().split('T')[0];  // Format date to YYYY-MM-DD
}
updateRequestDates() {
  const req_ID = this.bookingDetails.booking_ID;
  const formattedStartDate = new Date(this.startDate).toISOString().split('T')[0];  // Output: 'YYYY-MM-DD'
const formattedEndDate = new Date(this.endDate).toISOString().split('T')[0];
  this.bookingService.updateRequestDates(req_ID, formattedStartDate,formattedEndDate)
    .subscribe(
      (response) => {
        console.log('Request dates updated successfully:', response);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Updating dates successfully'});
      },
      (error) => {
        console.error('Error updating request dates:', error);
      }
    );
}


getFinalTotal(): number {
  return (this.bookingDetails?.full_Secuirty || 0) + 
         (this.bookingDetails?.full_Service || 0) + 
         (this.bookingDetails?.full_Rent || 0);
}

}
