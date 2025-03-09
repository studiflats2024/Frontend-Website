






import { Component , DoCheck , OnInit ,  HostListener,  AfterViewInit, ElementRef, ViewChild , OnChanges, SimpleChanges, AfterViewChecked, QueryList, ViewChildren,ChangeDetectorRef, ViewContainerRef, ComponentFactoryResolver   } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FaqService } from '../../services/faq.service';
import $ from 'jquery';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray } from '@angular/forms';
import { UserService  } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { BookingService} from '../../services/booking.service';

import { MessagingService } from '../../services/messaging.service';
import { HttpClient } from '@angular/common/http';
import { AuthComponent } from '../auth/auth.component';
import { Globals, isValidEmail } from '../../globals/global';
import { ApartmentSearchService } from '../../services/apartment-search.service';




declare var intlTelInput: any;
declare var intlTelInputUtils: any;


interface FAQ {
  faq_ID: string;
  faq_Quest: string;
  faq_Ans: string;
}

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit,AfterViewInit, OnChanges, AfterViewChecked , DoCheck  {
    @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
    renderAuthComponent() {
      // Clear the container (optional, in case you're re-rendering)
      this.container.clear();
  
      // Create the component dynamically
      const factory = this.resolver.resolveComponentFactory(AuthComponent);
      const componentRef = this.container.createComponent(factory);
      componentRef.changeDetectorRef.detectChanges();
  
      
    }
    onGalleryHide(): void {
      this.showimages = false;
      console.log('Gallery closed!');
    }
    onGalleryVisibilityChange(visible: boolean): void {
      console.log('Gallery visibility changed:', visible);
      this.showimages = visible; // Sync visibility state
    }
    

    
    
  selectedItem:any=0;
  apartments: Apartment[] = [];
  subscriptions: Subscription[] = [];
  loginMethod: string = 'whatsApp';
  loginForm!: FormGroup;
  forgetForm!:FormGroup;
  bookingForm!: FormGroup;
  studentOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'}
  ];

  selectedStudentStatus: string='';
  universityName: string='';
  agencyCode: string='';

  fullApartmentSelected : any;
  selectedRooms: any[] = [];
  selectedBeds: any[] = [];
  maxGuests = 1; // Set based on selection in step 1
  guestsData: any[] = [];
  guestsCount = 0;
  selectedRole:string='';
  roles:any;
  guestsAPI :any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  ngDoCheck(): void {
    if (Globals.authg !== this.auth) {
      console.log(`Globals.authg changed from ${this.auth} to ${Globals.authg}`);
      this.auth = Globals.authg;
    }
  }

  passwordFieldType: string = 'password'; // This controls the input type

  passwordFieldTypee: string = 'password';
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  togglePasswordVisibilityconfirm(): void {
    this.passwordFieldTypee = this.passwordFieldTypee === 'password' ? 'text' : 'password';
  }
  getPlaceholder(): string {
    const placeholder = this.selectedRole === 'employee' ? 'Work Place' : 'University';
    return this.capitalize(placeholder);
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  openModalFromOtherComponent() {
    this.userService.openModal(); // Use the service to trigger opening the modal
  this.displayModal='none';
  }

  initializeGuestsAPI() {
    this.guestsAPI = this.selectedBeds.map((i) => ({
      apartment_ID: this.aprt.apartment_ID,
      room_ID: i.room_ID,
      bed_ID: i.bed_ID,
      guest_Name: '',
      guest_WA_No: '',
      guest_Email: ''
    }));
    // this.newGuestArr=[...this.guestsAPI];
  }
  getIconForFeature(featureName: string): string {
    switch (featureName) {
      case 'Wifi':
        return 'wifi.svg';
      case 'Dryer':
        return 'fire.svg';
      case 'Coffee Machine':
        return 'coffee.svg';
      case 'Dishwasher':
        return 'dish.svg';
      case '2 toilets':
        return 'bath.svg';
      case 'Prime area':
        return 'primearea.svg';
      case 'Iron':
        return 'iron.svg';
      case 'Parking':
        return 'parking.svg';
      default:
        return 'default-icon.svg'; // Optional: a default icon for unrecognized features
    }
  }


  onCheckinDateChange(date: string) {
    const checkoutDate = new Date(date); // Convert input date to a Date object
    const availableFrom = new Date(this.aprt.available_From); // Convert available_From to a Date object
    // const checkoutDatee = new Date(this.checkoutDate);
    // this.checkoutDate=checkoutDate.setMonth(checkoutDate.getMonth() + 3).toString();
    

    //////////////////////////////////////////////////////
    let checkoutDatee = new Date( checkoutDate);
    checkoutDatee.setMonth(checkoutDate.getMonth() + this.minStay);

    if(new Date(checkoutDatee) >new Date(this.aprt.available_To)){
      checkoutDatee =new Date(this.aprt.available_To) ;
         
    }

    const d = new Date(checkoutDatee.getTime() - checkoutDatee.getTimezoneOffset() * 60000);///////added new to fix miss day


   
    const formattedCheckoutDate = d.toISOString().split('T')[0];

     
    // const formattedCheckoutDate = checkoutDatee.toISOString().split('T')[0];

     
    this.checkoutDate = formattedCheckoutDate;
    console.log( this.checkoutDate)
    ////////////////////////////////////////////////////////
   
    if (checkoutDate < availableFrom) {
        console.log("Not Available");
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: `Please change check-in date, check-in date before ${availableFrom.toISOString().split('T')[0]} not available `,
          life: 6000
      });
        return; // Exit the function if the checkout date is invalid
    }

    console.log("Available");


    if(date>=new Date().toISOString().slice(0, 10) ){
      this.bookingForm.get('bookingStartDate')?.setValue(date);
    }else{
            this.messageService.add({
            severity: 'info',
            summary: 'info',
            detail: "You can't choose this date for check-in"
        });
    }




  }

  onCheckoutDateChange(date: string) {
     //.split('T')[0]
    // let dateFormat=new Date(date)
    // const checkoutDate =  this.aprt.available_To 
    // console.log(dateFormat,checkoutDate)

    const checkoutDate = new Date(date); // Convert input date to a Date object
    const availableTo = new Date(this.aprt.available_To); // Convert available_From to a Date object
    // console.log(this.aprt.min_Stay)

    if (checkoutDate > availableTo) {
        console.log("Not Available");
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: `Please change check-out date, check-out date after ${availableTo.toISOString().split('T')[0]} not available `,
          life: 6000
      });
        return; // Exit the function if the checkout date is invalid
    }

    console.log("Available");

    // const checkinDateString = this.bookingForm.get('bookingStartDate')?.value;
    // const checkoutDate = new Date(this.checkoutDate);


    // const checkinDate = new Date(checkinDateString);


    // const minCheckoutDate = new Date(checkinDate);
    // minCheckoutDate.setMonth(minCheckoutDate.getMonth() + 5);


    // if (checkoutDate >= minCheckoutDate) {
    //     this.bookingForm.get('bookingEndDate')?.setValue(checkoutDate);
    // } else {
    //     this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Minimum period between check-in and check-out is 5 months'
    //     });
    // }
  

  }

  newGuestArr:any;

  checkoutDate:string='';
  checkinDate:string=new Date().toISOString().slice(0, 10);
  initForm() {
    // this.newGuestArr=[...this.guestsAPI]
    this.bookingForm = this.fb.group({
      apartmentID: this.apt_UUID,
      roomid:[''],
      bedid:[''],
      bookingStartDate: [this.checkinDate],
      bookingEndDate: [this.checkoutDate],
      bookingAgentCode: [''],
      guestss:  this.newGuestArr,
      guestProfession: [''],
      bookingUnvWPName: [''],
      fullApartment: this.selectfullaprt
    });
  }
  get guestss(): FormArray {
    return this.bookingForm.get('guestss') as FormArray;
  }
  // get guestapi():FormArray {
  //   this.newGuestArr=[...this.guestsAPI]
  //   return this.newGuestArr;
  // }

 

roomsStep2:any
totalPriceBooking=0;
guestEmail: string = '';
fullName: string = '';
guestPhone: string = '';
emailTouched: boolean = false;
fullNameTouched: boolean = false;
phoneTouched: boolean = false;
 
activeStep2:boolean=false;
  submitstep2(){
    if(this.selectedItem > this.selectedBeds.length){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'guests must be equal no of beds or more' });
      return;
    }
    console.log(this.guestsAPI)
    // this.guestsAPI[0]=this.newGuestArr[0];
    // this.guestsAPI[this.indexstay]=this.newGuestArr[this.indexstay];
    // console.log(this.guestsAPI)
    // console.log(this.newGuestArr)

    // let guestString = this.selectedGuest ?? '';
    // let guestNumberMatch = guestString.match(/\d+/);
    // let guestNumber = guestNumberMatch ? parseInt(guestNumberMatch[0], 10) : null;
    if(this.activeIndex===1){
     
      for(let i=0; i<this.guestsAPI.length; i++){
        if(this.selectedItem>1 ){
          if (this.guestsAPI[i].guest_Name==='' || this.guestsAPI[i].guest_WA_No==='' || this.guestsAPI[i].guest_Email==='') {

            this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'Please complete guests data.' });
            return;
          }

        }

      }
      }



    if(this.selectedItem! >this.guestsAPI.length ){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must select first' });
    }
   else if(this.activeIndex===1&&this.bookingForm.get('bedid')?.value===''&& this.selectedItem!==1 ){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must choose your bed or your room' });

    }else if(this.activeIndex===0){
      this.activeIndex=1;
    }else if(this.activeIndex===1){
      this.activeIndex=2;
    }
/////////////////////////////
    let selectedRooms = this.aprt.apartment_Rooms.filter((room: any) => {
      // التحقق مما إذا كان هناك أي سرير مختار في هذه الغرفة
      return room.room_Beds.some((roomBed: any) => {
        return this.selectedBeds.includes(roomBed) && room.room_ID === roomBed.room_ID;
      });
    });
    this.roomsStep2=selectedRooms;
    console.log(this.roomsStep2);

    // let totalPrice = 0;
    // this.roomsStep2.forEach((room: any) => {
    //    totalPrice += room.bed_Price;
    //    totalPrice += room.bed_SecuirtyDeposit;
    //    totalPrice += room.bed_Service_Fees;
    //    this.selectedBeds.forEach((bed: any) => {
    //    if(room.room_ID === bed.room_ID){
    //     totalPrice += bed.bed_Price;
    //    }
    //  });
    //  this.totalPriceBooking=totalPrice;
    // });
    let totalPrice = 0;
 if(!this.selectfullaprt){
  this.roomsStep2.forEach((room: any) => {
   
    this.selectedBeds.forEach((bed: any) => {
      if (room.room_ID === bed.room_ID) {
        totalPrice += room.bed_Price || 0;
        totalPrice +=room.bed_SecuirtyDeposit||0
        totalPrice +=room.bed_Service_Fees||0
      }
    });
  });
 }


this.totalPriceBooking = totalPrice;
console.log(this.totalPriceBooking)
////////////////////////////////////////////////////full apart
if(this.selectfullaprt){
  console.log(this.selectedRooms)
  console.log(this.selectedBeds)

  this.selectedRooms.forEach((room: any) => {
    // totalPrice += Number(room.bed_Price) || 0;
    // totalPrice += Number(room.bed_SecuirtyDeposit) || 0;
    // totalPrice += Number(room.bed_Service_Fees) || 0;
    room.room_Beds.forEach((bed: any) => {
      if (room.room_ID === bed.room_ID) {
        totalPrice += room.bed_Price || 0;
        totalPrice +=room.bed_SecuirtyDeposit||0
        totalPrice +=room.bed_Service_Fees||0
      }
    });
  });
  this.totalPriceBooking = totalPrice;
  console.log(this.totalPriceBooking)
}
////////////////////////////////////////////////////full apart


if(this.selectfullaprt && this.selectedItem>1 && this.selectedBeds.length>this.selectedItem ){

  this.selectedBeds=this.selectedBeds.slice(0, this.selectedItem);//////////////////////////////////////update without +1 
  console.log('new case', this.selectedBeds)
  this.guestsAPI = this.selectedBeds.map((i) => ({
    apartment_ID: this.aprt.apartment_ID,
    room_ID: i.room_ID,
    bed_ID: i.bed_ID,
    guest_Name: '',
    guest_WA_No: '',
    guest_Email: ''
  }));

}


  }
  backstep(){
    if(this.activeIndex===1){
      this.activeIndex=0;

    }else if(this.activeIndex===2){
      this.activeIndex=1;
      this.activeStep2=true;

    }else if(this.activeIndex===0){
      this.displayModalbooking='none'
    }
    // else if(this.activeIndex===2){
    //   this.activeIndex=2;
    // }
  }

  loading:boolean=false;
  namelogin:any;
  emaillogin:any;
  phonelogin:any;
  onSubmitBooking(){
    const convertToISO = (dateString: string): string => {
      const date = new Date(dateString); // تحويل النص إلى كائن تاريخ
      return date.toISOString(); // تحويل التاريخ إلى تنسيق ISO
    };
    // this.checkinDate=convertToISO(this.checkinDate)
    // this.checkoutDate=convertToISO(this.checkoutDate)

    // console.log(this.checkinDate,this.checkoutDate)

    this.loading=true;
    // if(this.selectedItem===1){
    //   this.userService.getProfile().subscribe(
    //     data => {
    //       this.profileData = data;
    //       console.log('ProfileData :',this.profileData);
    //     },
    //     error => {
    //       console.error('There was an error!', error);
    //     }
    //   );
    // }

    if(this.selectedItem>1){
      console.log(this.guestsAPI)
      console.log(this.newGuestArr)



      let preservedguestsAPI=[...this.guestsAPI];


      this.guestsAPI[0]=this.newGuestArr[0];
      this.guestsAPI[this.indexstay]=preservedguestsAPI[0];
      this.newGuestArr=[...this.guestsAPI]

      console.log(this.guestsAPI)
      console.log(this.newGuestArr)
    }



    this.bookingForm.patchValue({
       guestss: this.newGuestArr ,
       guestProfession: this.selectedRole,
       /////////////////////////////////new
       bookingStartDate:convertToISO(this.checkinDate),
       bookingEndDate:convertToISO(this.checkoutDate)
       /////////////////////////////////new

    });
    let  bookingData:any;

     bookingData = {
      apartment_ID: this.bookingForm.get('apartmentID')?.value,
      // room_ID: this.bookingForm.get('roomid')?.value,
      // bed_ID: this.bookingForm.get('bedid')?.value,
      booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
      booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
      booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
      booking_Guests: this.bookingForm.get('guestss')?.value,
      booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
      booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
      full_Apartment: this.bookingForm.get('fullApartment')?.value,
    };

    // this.namelogin= localStorage.getItem('namelogin');
    // if(localStorage.getItem('emaillogin')!=null){
    //   this.emaillogin=  localStorage.getItem('emaillogin');
    // }else{
    //   this.emaillogin=this.bookingForm.get('guestss')?.value[0].guest_Email||'null';
    // }
    // if(localStorage.getItem('phonelogin')!=null){
    //   this.phonelogin=localStorage.getItem('phonelogin');
    // }else{
    //   this.emaillogin=this.bookingForm.get('guestss')?.value[0].guest_WA_No||'null';
    // }


    this.namelogin= this.profileData[0]?.fullName;
      this.emaillogin=this.profileData[0]?.email;
      this.phonelogin=this.profileData[0]?.mobile;






    if(this.selectfullaprt===true && this.selectedItem===1 ){

      bookingData = {
        apartment_ID: this.bookingForm.get('apartmentID')?.value,

        booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
        booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
        booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
        booking_Guests:  [{ apartment_ID: this.aprt.apartment_ID,
          room_ID:this.aprt.apartment_Rooms[0].room_Beds[0].room_ID,
          bed_ID:this.aprt.apartment_Rooms[0].room_Beds[0].bed_ID,
          guest_Name: this.namelogin,
          guest_WA_No: this.phonelogin,
          guest_Email: this.emaillogin}],
        booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
        booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
        full_Apartment: this.bookingForm.get('fullApartment')?.value,
      };
      console.log(bookingData)
    }else{
      console.log(bookingData,this.selectedItem,this.bookingForm.get('fullApartment')?.value)
    }


    // if(this.selectfullaprt===true ){

    //   bookingData = {
    //     apartment_ID: this.bookingForm.get('apartmentID')?.value,

    //     booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
    //     booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
    //     booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
    //     booking_Guests: this.bookingForm.get('guestss')?.value,
    //     booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
    //     booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
    //     full_Apartment: this.bookingForm.get('fullApartment')?.value,
    //   };
    //   console.log(bookingData)
    // }else{
    //   console.log(bookingData,this.selectedItem,this.bookingForm.get('fullApartment')?.value)
    // }


    if(this.selectedRooms.length===1 && this.selectedItem===1){



      this.bookingForm.patchValue({
        roomid:this.selectedRooms[0].room_ID,
        bedid:this.selectedRooms[0].room_Beds[0].bed_ID
     });

     bookingData = {
      apartment_ID: this.bookingForm.get('apartmentID')?.value,
      room_ID: this.bookingForm.get('roomid')?.value,
      // bed_ID:this.bookingForm.get('bedid')?.value,
      booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
      booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
      booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
      booking_Guests:  [{ apartment_ID: this.aprt.apartment_ID,
        room_ID:this.bookingForm.get('roomid')?.value,
        bed_ID:this.bookingForm.get('bedid')?.value,
        guest_Name: this.namelogin,
        guest_WA_No: this.phonelogin,
        guest_Email: this.emaillogin}],
      booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
      booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
      full_Apartment: this.bookingForm.get('fullApartment')?.value,
    };
     console.log( bookingData)
    }else{
      console.log( this.bookingForm.value)
    }


    if(this.selectedBeds.length===1 && this.selectedItem===1){



      this.bookingForm.patchValue({
        roomid:this.selectedBeds[0].room_ID,
        bedid:this.selectedBeds[0].bed_ID
     });

     bookingData = {
      apartment_ID: this.bookingForm.get('apartmentID')?.value,
      // room_ID: this.bookingForm.get('roomid')?.value,
      bed_ID:this.bookingForm.get('bedid')?.value,
      booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
      booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
      booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
      booking_Guests:  [{ apartment_ID: this.aprt.apartment_ID,
        room_ID:this.bookingForm.get('roomid')?.value,
        bed_ID:this.bookingForm.get('bedid')?.value,
        guest_Name: this.namelogin,
        guest_WA_No: this.phonelogin,
        guest_Email: this.emaillogin}],
      booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
      booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
      full_Apartment: this.bookingForm.get('fullApartment')?.value,
    };
     console.log( bookingData)
    }else{
      console.log( this.bookingForm.value)
    }

    if(this.selectfullaprt===false && this.selectedItem > 1 && this.selectedBeds.length > this.selectedItem && this.selectedRooms.length===1){
      bookingData = {
        apartment_ID: this.bookingForm.get('apartmentID')?.value,
        room_ID: this.bookingForm.get('roomid')?.value,
        // bed_ID: this.bookingForm.get('bedid')?.value,
        booking_Start_Date: this.bookingForm.get('bookingStartDate')?.value,
        booking_End_Date: this.bookingForm.get('bookingEndDate')?.value,
        booking_Agent_Code: this.bookingForm.get('bookingAgentCode')?.value,
        booking_Guests: this.bookingForm.get('guestss')?.value,
        booking_Guest_Profession: this.bookingForm.get('guestProfession')?.value,
        booking_Unv_WP_Name: this.bookingForm.get('bookingUnvWPName')?.value,
        full_Apartment: this.bookingForm.get('fullApartment')?.value,
      };
    }else{
     console.log('hellooo',this.selectfullaprt, this.selectedItem , this.selectedBeds , this.selectedRooms.length)
    }



    // const token = localStorage.getItem('token');
    // if (!token) {
    //   this.router.navigate(['/login']);
    // }
    // if(bookingData.room_ID==='' ){
    //   this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must choose your bed' });
    // }
    console.log(bookingData)
    console.log('Guests:', this.guestss.value);
    console.log('Guests:', this.bookingForm.value);
    console.log('Current Guest Data:', this.newGuestArr);
    this.apartmentService.sendBookingData(bookingData).subscribe(
      response => {
        this.loading=false;

        this.messageService.add({ severity: 'success', summary: 'Booking Confirmed', detail: response.message });
        console.log('Booking created successfully', response);
        // localStorage.setItem('bookingConfirmation', response.confirmationNumber);

        // Open the booking confirmation modal or any other action
        this.openModalsuccess();
        this.allResponse.can_Request=false

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: error.error.message ,life:4000 });
        console.error('Error creating booking', error);
        this.loading=false;
        this.inputValues = {};
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          if (input.type !== 'date') { // Skip inputs of type date
            input.value = '';
          }
        });
        this.activeIndexd=null
        this.displayModalbooking='none'
        this.selectedBeds=[]
        this.selectedItem=0
        this.displaymainArray=[]
        // this.guestsAPI = this.selectedBeds.map((i) => ({
        //   apartment_ID: this.aprt.apartment_ID,
        //   room_ID: i.room_ID,
        //   bed_ID: i.bed_ID,
        //   guest_Name: '',
        //   guest_WA_No: '',
        //   guest_Email: ''
        // }));
        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);

  // this.guestsAPI=[];
  // this.newGuestArr = [];
 
  // this.bookingForm.patchValue({
  //   guestss:  this.newGuestArr,
  //   guestProfession: this.selectedRole,
  // });
  // console.log("Updated guestsAPI:", this.guestsAPI);
  // console.log("Cleared newGuestArr:", this.newGuestArr);
  // console.log("input values:", this.inputValues);


      }
    );
  }

  setMaxGuests() {
    const guestsSelection = this.bookingForm.get('guests')?.value;
    this.maxGuests = parseInt(guestsSelection.split(' ')[0], 10);
  }

  onGuestInfoChange() {
    this.guestsData = [];
    this.guestsCount = 0;
    // this.displaymainArray=[]
    this.selectedRooms.forEach((room: { room_Type: string, room_Beds: any[] }) => {
      room.room_Beds.forEach(bed => {
        if (bed.stay === 'yes') {
          this.guestsCount++;
          this.guestsData.push({
            room_Type: room.room_Type,
            bed_Name: bed.bed_Name,
            guestName: bed.guestName,
            guestEmail: bed.guestEmail,
            guestPhone: bed.guestPhone
          });
        }
      });
    });

    if (this.guestsCount > this.maxGuests) {
      alert(`You cannot enroll more than ${this.maxGuests} guests.`);
      this.guestsData.pop(); // Remove the last added guest as it exceeds the limit
    }

    this.bookingForm.get('guestsData')?.setValue(this.guestsData);
  }
  // onFullApartmentSelected() {
  //   const fullApartmentSelected = this.bookingForm.get('fullApartment')?.value;
  // console.log(fullApartmentSelected);
  //   if (fullApartmentSelected) {
  //     console.log(fullApartmentSelected)
  //     this.selectedRooms = this.aprt.apartment_Rooms.map((room: { room_Beds: any[]; }) => room);
  //     this.selectedBeds = [];
  //     this.aprt.apartment_Rooms.forEach((room: { room_Beds: any[]; }) => {
  //       room.room_Beds.forEach(bed => this.selectedBeds.push(bed));
  //     });
  //     console.log(this.selectedRooms,this.selectedBeds)
  //   } else {
  //     this.selectedRooms = [];
  //     this.selectedBeds = [];
  //     console.log(this.selectedRooms,this.selectedBeds)
  //   }
  //   this.bookingForm.get('selectedRooms')?.setValue(this.selectedRooms);
  //   this.bookingForm.get('selectedBeds')?.setValue(this.selectedBeds);
  // }
  selectfullaprt:boolean=false;
  onFullApartmentSelected(event: any) {
      /////////////////clear////////////////////
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type !== 'date'&& input.type !=='checkbox') { // Skip inputs of type date
          input.value = '';
        }
      });
      this.activeIndexd=null
    
      this.displaymainArray=[]
      //////////////////////////////////////
    // الحصول على القيمة المحدثة للـ checkbox من النموذج
    // this.selectfullaprt = this.bookingForm.get('fullApartment')?.value;
    const fullApartmentSelected = event.target.checked;
    this.selectfullaprt=fullApartmentSelected;
    console.log('Full Apartment Selected:', this.selectfullaprt);
    // this.bookingForm.get('fullApartment')?.setValue(this.selectfullaprt);
    this.bookingForm.patchValue({
      fullApartment:this.selectfullaprt
   });
   console.log('Form Values After Update:', this.bookingForm.value);
    if (this.selectfullaprt) {
      // تنفيذ المنطق عندما يتم تحديد "Full Apartment"
      this.selectedRooms = this.aprt.apartment_Rooms.map((room: { room_Beds: any[]; })  => room);
      this.selectedBeds = [];
      this.aprt.apartment_Rooms.forEach((room: {room_Type:string, room_Beds: any[]; })  => {

        room.room_Beds.forEach(bed =>
          //  this.selectedBeds.push(bed)
          {
            // if ( bed.bed_Available) {isAvailable
            if ( bed.isAvailable) { 

              bed['room_Type']=room.room_Type;
              bed['apartment_ID']=this.aprt.apartment_ID;
               this.selectedBeds.push(bed);
             }else{
              this.selectfullaprt=false;
              this.bookingForm.patchValue({
                fullApartment:this.selectfullaprt
             });
            //  event.target.checked=false;
            //  this.selectfullaprt=event.target.checked;
            //  event.target.disabled=true;
             }
          }
          );
      });
        this.guestsAPI = this.selectedBeds.map((i) => ({
      apartment_ID: this.aprt.apartment_ID,
      room_ID: i.room_ID,
      bed_ID: i.bed_ID,
      guest_Name: '',
      guest_WA_No: '',
      guest_Email: ''
    }));
    // this.newGuestArr=[...this.guestsAPI];
      this.initForm();
    } else {
      // إعادة تعيين القيم إذا لم يتم تحديد "Full Apartment"
      this.selectedRooms = [];
      this.selectedBeds = [];
    }

    // تحديث القيم في النموذج
    // this.bookingForm.get('selectedRooms')?.setValue(this.selectedRooms);
    // this.bookingForm.get('selectedBeds')?.setValue(this.selectedBeds);

    // تسجيل القيم في الكونسول

  }


  // onRoomSelected(room: any) {
  //   room.room_Beds.forEach((bed: any) => {
  //     bed.selected = room.selected;
  //   });
  //   if (room.selected) {

  //     this.selectedRooms.push(room);
  //     room.room_Beds.forEach((bed: any) => {
  //       if (bed.selected) {
  //         this.selectedBeds.push(bed);
  //       }
  //     });
  //   } else {
  //     this.selectedRooms = this.selectedRooms.filter(r => r !== room);
  //     room.room_Beds.forEach((bed: any) => {
  //       this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
  //     });
  //   }
  //   this.bookingForm.get('selectedRooms')?.setValue(this.selectedRooms);
  //   this.bookingForm.get('selectedBeds')?.setValue(this.selectedBeds);
  // }
  selectedroom:any;
  checkedroom:any;
  selectedrommID:any ;

  @ViewChildren('bedCheckbox') bedCheckboxes!: QueryList<ElementRef>;
  onRoomSelected(event: Event, room: any) {

     

      


    // if(room.room_Type==='Trible'){

    // }else if(room.room_Type==='Custom'){

    // }else if(room.room_Type==='shared_area'){

    // }


    let isChecked = (event.target as HTMLInputElement).checked;






    
    if( !(this.selectedItem===1&&this.selectedBeds.length!==0) ){
    this.selectedrommID=room.room_ID;
    this.selectedroom=room.room_Type;
    this.bedCheckboxes.forEach((checkbox, index) => {
      const bedCheckboxElement = checkbox.nativeElement as HTMLInputElement;
      if (index < this.bedCheckboxes.length) {
        bedCheckboxElement.checked = isChecked;
      }
    });


    this.bookingForm.get('fullApartment')?.setValue(false);
    // Set the selected state of all beds in this room to match the room's selected state

    const noBedsNeed = this.selectedItem - this.selectedBeds.length;
    if(isChecked&&this.selectedBeds.length!==0 && noBedsNeed<=0  ){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'You cannot select more.' });
      (event.target as HTMLInputElement).checked=false;
      return;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////clear/////////////
    if (!(isChecked && this.selectedBeds.length !== 0 && noBedsNeed <= 0)) {
      /////////////////clear////////////////////

     

      let allBedsAvailable = true; // متغير لتحديد إذا كانت كل الأسرة متاحة

      for (let i = 0; i < room.room_Beds.length; i++) {
        const bed = room.room_Beds[i];
      
        if (!bed.isAvailable) { // إذا كان السرير غير متاح
          allBedsAvailable = false; // السرير غير متاح
          break; // توقف التكرار
        }
      }
      
      // تنفيذ الكود فقط إذا كانت كل الأسرة متاحة
      if (allBedsAvailable) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          if (input.type !== 'date' && input.type !== 'checkbox') { // تخطي الحقول من نوع date و checkbox
            input.value = '';
          }
        });
        this.activeIndexd = null;
        this.displaymainArray = [];
      }
      
      //////////////////////////////////////
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////clear/////////////

    if (isChecked) {
      // Add the room to selectedRooms array if it's selected



      // Add the selected beds of this room to selectedBeds array
      // room.room_Beds.forEach((bed: any) => {
      //   if(!bed.bed_Available){
      //     this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you can not booking this room' });
      //     return;
      //   }else{
      //     if (isChecked && bed.bed_Available &&!this.selectedBeds.includes(bed)) {
      //       bed['room_Type']=room.room_Type;
      //       bed['apartment_ID']=this.aprt.apartment_ID;
      //        this.selectedBeds.push(bed);
      //      }
      //   }

      // });
      this.selectedRooms.push(room);
      // this.displaymainArray=[];
      for (let i = 0; i < room.room_Beds.length; i++) {
        const bed = room.room_Beds[i];

        // if (!bed.bed_Available) {isAvailable
        if (!bed.isAvailable) { 

          this.selectedRooms = this.selectedRooms.filter(r => r !== room);
          (event.target as HTMLInputElement).checked=false;
          this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'You cannot book this room.' });
///after tester///
            // Remove all beds associated with the room from selectedBeds
    room.room_Beds.forEach((bed: any) => {
      this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
  });

///after tester///


  // Log updated selectedRooms and selectedBeds for debugging
  console.log("Selected Rooms:", this.selectedRooms);
  console.log("Selected Beds:", this.selectedBeds);
          break;  // استخدم break للخروج من الحلقة
        } else {

          // if (isChecked && bed.bed_Available && !this.selectedBeds.includes(bed)) {isAvailable
          if (isChecked && bed.isAvailable && !this.selectedBeds.includes(bed)) { 

            bed['room_Type'] = room.room_Type;
            bed['apartment_ID'] = this.aprt.apartment_ID;
            this.selectedBeds.push(bed);
          }
        }
      }
      if(this.selectedRooms.length>1&&this.selectedItem<this.selectedBeds.length){
        this.selectedRooms = this.selectedRooms.filter(r => r !== room);
        isChecked=false;
        room.room_Beds.forEach((bed: any) => {
          this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
        });
        this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you can not booking this room ,please select another room or beds' });

      }
       this.guestsAPI = this.selectedBeds.map((i) => ({
      apartment_ID: this.aprt.apartment_ID,
      room_ID: i.room_ID,
      bed_ID: i.bed_ID,
      guest_Name: '',
      guest_WA_No: '',
      guest_Email: ''
    }));
    // this.newGuestArr=[...this.guestsAPI];

      this.initForm();
    } else   {

      // Remove the room from selectedRooms array if it's deselected
      this.selectedRooms = this.selectedRooms.filter(r => r !== room);

      // Remove the beds of this room from selectedBeds array
      room.room_Beds.forEach((bed: any) => {
        this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
      });
      this.initForm();
      if(this.selectedBeds.length===0){
        this.selectfullaprt=false;
        console.log(this.selectfullaprt)
        this.bookingForm.patchValue({
          fullApartment:this.selectfullaprt
       });
      }
    }


  }else if(this.selectedItem===1&&this.selectedBeds.length!==0){
    if(this.selectedRooms.includes(room)){
      this.selectedRooms = this.selectedRooms.filter(r => r !== room);

      // Remove the beds of this room from selectedBeds array
      room.room_Beds.forEach((bed: any) => {
        this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
      });
      this.initForm();
    }else if(isChecked){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you can not booking more than bed or room' });
    }


  }
    // Update the form control values
    // this.bookingForm.get('selectedRooms')?.setValue(this.selectedRooms);
    // this.bookingForm.get('selectedBeds')?.setValue(this.selectedBeds);

    // Logging the current state
    let allBedSelected=false;
    for(let i=0; i<this.aprt.apartment_Rooms.length; i++){


      allBedSelected = this.aprt.apartment_Rooms[i].room_Beds.every((roomBed: any) => {
        return this.selectedBeds.includes(roomBed); // هنا نعود true أو false بناءً على الشرط
      });

      if (!allBedSelected) {
        break; // إذا لم يتم اختيار كل الأسرة، يمكننا التوقف عن الفحص
      }
    }

    if(allBedSelected){
     this.selectfullaprt=true;
     this.cdr.detectChanges();
     this.bookingForm.patchValue({
      fullApartment:this.selectfullaprt
   });
    }
    console.log(this.selectfullaprt,allBedSelected)

    console.log('Room Selected:', room.selected);
    console.log('Selected Rooms:', this.selectedRooms);
    console.log('Selected Beds:', this.selectedBeds);

    
  }

  onBedSelected(event: Event,bed:any,room:any,allroom:any ){

 
    console.log(this.checkinDate,this.checkoutDate)
    console.log(bed.beds_Booked_Dates)
    const isChecked = (event.target as HTMLInputElement).checked;
    // this.bedCheckboxes.forEach((checkbox, index) => {
    //   const bedCheckboxElement = checkbox.nativeElement as HTMLInputElement;
    //   if (index < this.bedCheckboxes.length) {
    //     bedCheckboxElement.checked = isChecked;
    //   }
    // });
    // console.log(this.selectedroom  )
    const noBedsNeed = this.selectedItem - this.selectedBeds.length;
    if(isChecked&&this.selectedBeds.length!==0 && noBedsNeed<=0  ){
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'You cannot select more.' });
      (event.target as HTMLInputElement).checked=false;
      return;
    }

    if(!(isChecked&&this.selectedBeds.length!==0 && noBedsNeed<=0  )){
       /////////////////clear///////////////////////////////////////////////////////////////////
       const inputs = document.querySelectorAll('input');
       inputs.forEach(input => {
         if (input.type !== 'date'&& input.type !=='checkbox') { // Skip inputs of type date
           input.value = '';
         }
       });
       this.activeIndexd=null
     
       this.displaymainArray=[]
       ////////////////////////////////////////////////////////////////////////////////////////////////
    }

    if(!(this.selectedItem===1&&this.selectedBeds.length!==0) ){
      console.log('hi')
    if(   !this.selectedBeds.includes(bed)){//this.selectedroom!==room &&selectedrommID


      /////////////////////////////////////
    //   this.selectedBeds.push(bed);
    //   const anyBedSelected = allroom.room_Beds.every((roomBed: any) =>{
    //      if(roomBed.bed_Available){
    //       this.selectedBeds.includes(roomBed)
    //       console.log(roomBed.bed_Available)
    //      }
    //   }

    // );
    // console.log(anyBedSelected);

    // if (anyBedSelected) {
    //   console.log(anyBedSelected);

    //     if (!this.selectedRooms.includes(allroom)) {
    //         this.selectedRooms.push(allroom);
    //         this.cdr.detectChanges();
    //     }
    // } else {

    //     console.log(anyBedSelected);
    //     this.selectedRooms = this.selectedRooms.filter(r => r !== allroom);
    //     this.cdr.detectChanges();
    // }

////////////////////////////////////////////////////




      console.log('hello')
      bed['room_Type']=room;
      bed['apartment_ID']=this.aprt.apartment_ID;
      this.selectedBeds.push(bed);
      // this.displaymainArray=[];
      console.log(this.selectedBeds)
      console.log(this.bookingForm.value)
      this.selectfullaprt=false
      // this.cdr.detectChanges();
      this.bookingForm.patchValue({
        fullApartment:this.selectfullaprt
     });
      this.initializeGuestsAPI();
      this.initForm();
      console.log(this.selectedBeds)
      console.log(this.bookingForm.value)
    } else if (this.selectedBeds.includes(bed)){
      this.selectedBeds = this.selectedBeds.filter(b => b !== bed);

      this.selectfullaprt=false
      // this.cdr.detectChanges();
      this.bookingForm.patchValue({
        fullApartment:this.selectfullaprt
     });
      this.initForm();
      console.log(this.selectedBeds)
      console.log(this.bookingForm.value)
    }
  }else if(this.selectedItem===1 && this.selectedBeds.length!==0){
    if (this.selectedBeds.includes(bed)){
      this.selectedBeds = this.selectedBeds.filter(b => b !== bed);
    }else if(isChecked){
      console.log(isChecked)
      this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you can not booking more than bed or room' });
    }

    // this.cdr.detectChanges();
  }

       /////////////////////////////////////
  let allBedSelected=false;
 for(let i=0; i<this.aprt.apartment_Rooms.length; i++){


   allBedSelected = this.aprt.apartment_Rooms[i].room_Beds.every((roomBed: any) =>{
        this.selectedBeds.includes(roomBed)
   }

 );
 }
 if(allBedSelected){
  this.selectfullaprt=true;
  this.cdr.detectChanges();
  this.bookingForm.patchValue({
    fullApartment:this.selectfullaprt
 });
 }

    //    const anyBedSelected = allroom.room_Beds.every((roomBed: any) =>{

    //     if (roomBed.bed_Available) {
    //       console.log(roomBed.bed_Available);
    //       return this.selectedBeds.includes(roomBed);
    //     }
    //     return true;
    //    }

    //  );
    const anyBedSelected = allroom.room_Beds.every((roomBed: any) => {
      // if (!roomBed.bed_Available) {isAvailable
      if (!roomBed.isAvailable) { 

        return false; // إذا كان السرير غير متاح، نعود false مباشرةً
      }
      return this.selectedBeds.includes(roomBed); // تحقق ما إذا كان السرير متاحًا ومدرجًا في selectedBeds
    });

     console.log(anyBedSelected);

     if (anyBedSelected) {
       console.log(anyBedSelected);

         if (!this.selectedRooms.includes(allroom)) {
             this.selectedRooms.push(allroom);
             this.cdr.detectChanges();
         }
     } else {

         console.log(anyBedSelected);
         this.selectedRooms = this.selectedRooms.filter(r => r !== allroom);
         this.cdr.detectChanges();
     }







 ////////////////////////////////////////////////////
  }


  nextStep() {
    this.activeIndex++;
    if (this.activeIndex === 1) {
      console.log('Selected Rooms: ', this.selectedRooms);
      console.log('Selected Beds: ', this.selectedBeds);
    }
  }

  previousStep() {
    this.activeIndex--;
  }
displaymain='block';
activeIndexd: number | null = null;
displaymainArray: boolean[] = [];
decision:any;
indexstay:any;
preservedGuests:any
indexMainTenant!:number;
  onStayDecisionChange(index: number, decision: string, room_ID:string, bed_ID:string, bed:any) {
    this.newGuestArr=[]
    // this.guestsAPI=[]

    this.indexMainTenant=index;
    if (decision === 'yes') {
      this.userService.getProfile().subscribe(
        data => {
          this.profileData = data;
          console.log('ProfileData :',this.profileData);
          this.decision=index;
          console.log(room_ID,bed_ID,index,bed,'helloooooooooooooooooooooo')
          let preservedGuests = [...this.guestsAPI];
          this.preservedGuests=preservedGuests;
          this.indexstay=index;
          // console.log(index)
          this.displaymain='none'
          this.activeIndexd= index;
          this.displaymainArray[index] = false;
          // console.log('Guests:', this.guestss.value);

          console.log('guestAPI',this.guestsAPI)
          // this.newGuestArr.splice(index, 1);
          console.log(this.profileData[0]?.fullName)
          this.namelogin= this.profileData[0]?.fullName;
          this.emaillogin=this.profileData[0]?.email;
          this.phonelogin=this.profileData[0]?.mobile;
          this.guestsAPI[index]={
            apartment_ID: this.aprt.apartment_ID,
            room_ID: bed.room_ID,
            bed_ID: bed.bed_ID,
            guest_Name: this.namelogin,
            guest_WA_No: this.phonelogin,
            guest_Email: this.emaillogin
          };

          this.newGuestArr[0]={
            apartment_ID: this.aprt.apartment_ID,
            room_ID: bed.room_ID,
            bed_ID: bed.bed_ID,
            guest_Name: this.namelogin,
            guest_WA_No: this.phonelogin,
            guest_Email: this.emaillogin
          };
          console.log('guestARR',this.newGuestArr)

          // if(index!==0){
          //   console.log("yyyyyyyyyyyyyyyyyyyy")
          //   this.newGuestArr[0]={
          //     apartment_ID: this.aprt.apartment_ID,
          //     room_ID: bed.room_ID,
          //     bed_ID: bed.bed_ID,
          //     guest_Name: this.namelogin,
          //     guest_WA_No: this.phonelogin,
          //     guest_Email: this.emaillogin
          //   };
          //   this.newGuestArr[index]= preservedGuests[0];
          //   this.bookingForm.patchValue({
          //     guestss: this.newGuestArr ,
          //     roomid:bed.room_ID,
          //     bedid:bed.bed_ID
          //  });
          //  console.log(this.bookingForm.value)

          // }else{
          //   console.log("yyyyyyyyyyyyyyyyyyyy")
          //   this.newGuestArr[0]={
          //     apartment_ID: this.aprt.apartment_ID,
          //     room_ID: bed.room_ID,
          //     bed_ID: bed.bed_ID,
          //     guest_Name: this.namelogin,
          //     guest_WA_No: this.phonelogin,
          //     guest_Email: this.emaillogin
          //   };
          //   this.bookingForm.patchValue({
          //     guestss: this.newGuestArr ,
          //     roomid:bed.room_ID,
          //     bedid:bed.bed_ID
          //  });
          //  console.log(this.bookingForm.value)
          // }


          // this.guestsAPI[0]={
          //   apartment_ID: this.aprt.apartment_ID,
          //   room_ID: bed.room_ID,
          //   bed_ID: bed.bed_ID,
          //   guest_Name: this.namelogin,
          //   guest_WA_No: this.phonelogin,
          //   guest_Email: this.emaillogin
          // };
          // this.guestsAPI[index]= preservedGuests[0];
          console.log(this.newGuestArr)
          console.log(this.guestsAPI)

          this.bookingForm.patchValue({
             guestss: this.newGuestArr ,
             roomid:bed.room_ID,
             bedid:bed.bed_ID
          });
        },
        error => {
          console.error('There was an error!', error);
        }
      );




    }else if(decision === 'no'&& !this.guestsAPI.includes(bed)){
      console.log(bed)
       this.displaymain='block'
       this.activeIndexd= null;
       this.displaymainArray[index] = true;
///////////////////////////////new///////////////////////////
       this.guestsAPI[index]={
        apartment_ID: this.aprt.apartment_ID,
        room_ID: bed.room_ID,
        bed_ID: bed.bed_ID,
        guest_Name: '',
        guest_WA_No: '',
        guest_Email: ''
      };
///////////////////////////////new///////////////////////////

    //  this.newGuestArr.push({
    //     apartment_ID: this.aprt.apartment_ID,
    //     room_ID: bed.room_ID,
    //     bed_ID: bed.bed_ID,
    //     guest_Name: '',
    //     guest_WA_No: '',
    //     guest_Email: ''
    //   });
    //   this.newGuestArr=[...this.guestsAPI]
    //   this.bookingForm.patchValue({
    //     guestss: this.newGuestArr ,
    //     roomid:'',
    //     bedid:''
    //  });
    }
    // this.guestsAPI = this.selectedBeds.map((i) => ({
    //   apartment_ID: this.aprt.apartment_ID,
    //   room_ID: i.room_ID,
    //   bed_ID: i.bed_ID,
    //   guest_Name: '',
    //   guest_WA_No: '',
    //   guest_Email: ''
    // }));

    // this.guestapi;
    // this.initForm();
  }
  // @ViewChild('bookingphone') bookingPhoneInput!: ElementRef;


  // private initializeIntlTelInput(inputElement: HTMLElement): void {
  //   const iti = intlTelInput(inputElement, {
  //     initialCountry: 'de',
  //     preferredCountries: ['de', 'us', 'gb'],
  //     separateDialCode: true,
  //     utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  //   });

  //   inputElement.addEventListener('blur', () => {
  //     let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
  //     if (fullPhoneNumber.startsWith('+')) {
  //       fullPhoneNumber = fullPhoneNumber.substring(1);
  //     }

  //   });
  // }

  requestDataFromSearch:any

  constructor(
    private messagingService: MessagingService,
    private bookingService:BookingService,
    private apartmentService: ApartmentService,
    private router: Router,
    private messageService: MessageService ,
    public _ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private faqService: FaqService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private apartmentSearchService: ApartmentSearchService)
     {
      
      this.apartmentSearchService.requestData$.subscribe((data) => {
        this.requestDataFromSearch = data;
        console.log('Shared Request Data From Search:', this.requestDataFromSearch);
        if(this.requestDataFromSearch.checkIn||this.requestDataFromSearch.checkOut){
          this.checkinDate=this.requestDataFromSearch.checkIn
          this.checkoutDate=this.requestDataFromSearch.checkOut
          this.selectedItem=this.requestDataFromSearch.guests

        } 
        
        console.log(this.checkinDate, this.checkoutDate)
      });

    this.apt_UUID = _ActivatedRoute.snapshot.paramMap.get('id');
    this.initializeGuestsAPI();
    this.guestsAPI = this.selectedBeds.map((i) => ({
      apartment_ID: this.apt_UUID,
      room_ID: i.room_ID,
      bed_ID: i.bed_ID,
      guest_Name: '',
      guest_WA_No: '',
      guest_Email: ''
    }));
    // this.newGuestArr=[...this.guestsAPI]

    this.bookingForm = this.fb.group({
      apartmentID: this.apt_UUID,
      roomid:[''],
      bedid:[''],
      bookingStartDate: this.checkinDate,
      bookingEndDate: this.checkoutDate,
      bookingAgentCode: [''],
      guestss: this.newGuestArr,
      guestProfession: [''],
      bookingUnvWPName: [''],
      fullApartment: [this.selectfullaprt]
    });

      this.messagingService.requestPermission()
  .then((token:any) => {
    console.log('Device token:', token);
    this.deviceToken=token;
    // this.addToWishlist(apt_ID,this.deviceToken);
  })
  .catch((error:any) => {
    console.error('Error getting token:', error);
  });
    }




  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 8;

  faqs: FAQ[] = [];

  fetchFaqs(): void {
    this.faqService.getFaqs().subscribe((data: FAQ[]) => {
      this.faqs = data;
    });
  }

  items:any=[];
  activeIndex: number = 0;
  openModalsCount = 0;

//ng on init ------------------------------
ngOnChanges(changes: SimpleChanges) {
  console.log('Current Guest Data:', this.guestsAPI);
  console.log('ngOnChanges called with changes:', changes);
  if (changes['activeIndex'] && this.activeIndex === 1) {
    // this.initializeIntlTelInput('#bookingphone', this.bookingForm);

      setTimeout(() => {
        this.initializeIntlTelInput('#bookingphone', this.bookingForm);

      }, 0);
    debugger;
  }

  // const input = document.querySelector("#phoneid");

  // if (input) {
  //   const iti = intlTelInput(input, {
  //     initialCountry: "de",
  //     preferredCountries: ["de", "us", "gb"],
  //     separateDialCode: true,
  //     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"  // تحميل سكربت الأدوات المساعدة
  //   });


  //   input.addEventListener('blur', () => {
  //     let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);  // الحصول على الرقم بتنسيق E164
  //     if (fullPhoneNumber.startsWith("+")) {
  //       fullPhoneNumber = fullPhoneNumber.substring(1);  // إزالة رمز "+"
  //     }
  //     console.log("Full phone number:", fullPhoneNumber);
  //     this.loginForm.patchValue({ mobile: fullPhoneNumber });
  //     console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
  //      console.log(typeof( this.loginForm.value.mobile))
  //   });
  // } else {
  //   console.error("The phone input element was not found.");
  // }
}
private isIntlTelInputInitialized = false;

// ngAfterViewChecked() {
//   if (this.activeIndex === 1 && !this.isIntlTelInputInitialized) {
//     const input = document.querySelector('#bookingphone');
//     if (input) {
//       this.initializeIntlTelInput('#bookingphone', this.bookingForm);
//       this.isIntlTelInputInitialized = true;
//     }
//   }
// }
// ngAfterViewChecked() {
//   if (this.activeIndex === 1 && !this.isIntlTelInputInitialized) {
//       setTimeout(() => {
//           const inputs = document.querySelectorAll('.bookingphone');
//           inputs.forEach((input: Element) => {
//               const inputElement = input as HTMLInputElement;
//               if (inputElement) {
//                   this.initializeIntlTelInput(`#${inputElement.id}`, this.bookingForm);
//               }
//           });
//           this.isIntlTelInputInitialized = true; // Mark as initialized after all inputs are processed
//       }, 0); // Delay to ensure elements are in DOM
//   }
// }
private initializePhoneNumbers(): void {
  const inputs = document.querySelectorAll('.bookingphone'); // الحصول على جميع الحقول

  inputs.forEach((input: Element, index: number) => {
    const inputElement = input as HTMLInputElement;

    // التحقق من وجود الرقم في المصفوفة
    if (inputElement && this.guestsAPI[index]?.guest_WA_No) {
      const phoneNumber = this.guestsAPI[index].guest_WA_No;

      // تهيئة intl-tel-input
      const iti = intlTelInput(inputElement, {
        initialCountry: "auto",
        preferredCountries: ["de", "us", "gb"],
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
        searchCountry: true,
      });

      // ضبط الرقم في الحقل
      iti.setNumber(`+${phoneNumber}`);

      // استخراج كود الدولة عند تغيير الرقم
      inputElement.addEventListener('blur', () => {
        const fullPhoneNumber = iti.getNumber(); // الحصول على الرقم الكامل
        const countryCode = iti.getSelectedCountryData().dialCode; // استخراج كود الدولة

        // تحديث البيانات في المصفوفة
        this.guestsAPI[index] = {
          ...this.guestsAPI[index],
          guest_WA_No: fullPhoneNumber.substring(1), // إزالة "+"
          countryCode: countryCode,
        };

        console.log(`Country Code: ${countryCode}, Full Number: ${fullPhoneNumber}`);
      });

      // التعامل مع حدث تغيير الدولة
      inputElement.addEventListener("countrychange", () => {
        const selectedCountryData = iti.getSelectedCountryData();

        // تحديث كود الدولة والعلم
        this.guestsAPI[index] = {
          ...this.guestsAPI[index],
          countryCode: selectedCountryData.dialCode,
        };

        console.log(`Country changed to: ${selectedCountryData.name} (+${selectedCountryData.dialCode})`);
      });
    }
  });
}

ngAfterViewChecked() {
  // if (this.activeIndex === 1&&!this.activeStep2) {
  if (this.activeIndex === 1 ) {

      setTimeout(() => {
          const inputs = document.querySelectorAll('.bookingphone');
          inputs.forEach((input: Element, index: number) => {
              const inputElement = input as HTMLInputElement;
              if (inputElement && !inputElement.dataset['initialized']) {
                  this.initializeIntlTelInputbook(`#${inputElement.id}`, this.bookingForm,index);
                  inputElement.dataset['initialized'] = 'true'; // Mark as initialized
                  console.log('here init')
              }
          });
      }, 0); // Delay to ensure elements are in DOM
  }
  // else if(this.activeIndex === 1&&this.activeStep2){
  //   this.initializePhoneNumbers();
  //   this.activeStep2 = false;
  // }

  if (this.loginMethod === 'whatsApp') {
    this.loginMethod === 'whatsApp';
    const input = document.querySelector("#phoneid") as HTMLInputElement;

    if (input && !input.dataset['itiInitialized']) { // تحقق من وجود العنصر وعدم تهيئته سابقًا
      console.log('Phone input element found:', input);

      // تفعيل intlTelInput
      const iti = intlTelInput(input, {
        initialCountry: "de",
        preferredCountries: ["de", "us", "gb"],
        separateDialCode: true,
        // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
        searchCountry:true,
      });

      input.dataset['itiInitialized'] = 'true'; // علامة أن العنصر قد تم تهيئته

      // التعامل مع حدث blur لحفظ الرقم
      input.addEventListener('blur', () => {
        // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        let fullPhoneNumber = iti.getNumber();


        if (fullPhoneNumber.startsWith("+")) {
          fullPhoneNumber = fullPhoneNumber.substring(1); // إزالة رمز "+"
        }
        console.log("Full phone number:", fullPhoneNumber);
        this.loginForm.patchValue({ mobile: fullPhoneNumber });
        console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
      });

      // Handle 'countrychange' event to update the flag and dial code
input.addEventListener("countrychange", function() {
  // Clear the previous flag and dial code
  const flagContainer = document.querySelector(".iti__selected-flag");
  const dialCodeElement = document.querySelector(".iti__dial-code");
  console.log(flagContainer,dialCodeElement)
  // Remove previous flag and code visually
  if (flagContainer) {
      flagContainer.classList.remove("iti__selected-flag");
  }
  if (dialCodeElement) {
      dialCodeElement.textContent = '';  
  }

  // Get the new country data and update the flag and code
  const selectedCountryData = iti.getSelectedCountryData();

  // Reapply the new flag and dial code
  if (flagContainer) {
      flagContainer.classList.add("iti__selected-flag"); // Re-add flag class
      dialCodeElement!.textContent = "+" + selectedCountryData.dialCode; // Set the new dial code
  }

  // Optional: Log the new selected country and dial code
  console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
});

    }
  }

}
// onLoginMethodChange(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   this.loginMethod = inputElement.value;
//   console.log('Login method changed to:', this.loginMethod);

//   if (this.loginMethod === 'whatsApp') {
//     console.log('Login method changed to:', this.loginMethod);
//     setTimeout(() => {
//       const input = document.querySelector("#phone") as HTMLInputElement;
//       if (input && !input.dataset['itiInitialized']) {
//         console.log('Initializing intlTelInput');
//         const iti = intlTelInput(input, {
//           initialCountry: "de",
//           preferredCountries: ["de", "us", "gb"],
//           separateDialCode: true,
//           utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//         });
//         input.dataset['itiInitialized'] = 'true';
//       }
//     }, 1000);
//   }
// }

// initializeIntlTelInputt(inputId: string) {
//   const input = document.getElementById(inputId);
//   if (input && !input.dataset['initialized']) {
//     intlTelInput(input, {
//       initialCountry: "de",
//       preferredCountries: ["de", "us", "gb"],
//       separateDialCode: true,
//       utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//     });
//     input.dataset['initialized'] = 'true'; // Mark as initialized
//   }
// }







selectedGuest: string = 'Select guests';
passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { 'mismatch': true };
}

map!: google.maps.Map;
addMarker(apartment: any) {
  const marker = new google.maps.Marker({
    position: { lat: apartment.apartment_Lat, lng: apartment.apartment_Long },
    map: this.map,
    title: apartment.apartment_Name
  });
}
markerOptions: google.maps.MarkerOptions = {
  draggable: false
};
markerPosition: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };
  ngOnInit() {
   
    
    this.isVisible=false;
    // const mapOptions: google.maps.MapOptions = {
    //   center: { lat: 51.1657, lng:  10.4515 },
    //   zoom: 12
    // };
    // this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);


    this.loginMethod === 'whatsApp';
    console.log('guests',this.selectedItem)

    this.forgetForm=this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    

    
    

    console.log(this.selectedItem)
    // this.namelogin= localStorage.getItem('namelogin');
    // this.emaillogin=  localStorage.getItem('emaillogin');
    // this.phonelogin=localStorage.getItem('phonelogin');




    this.initializeGuestsAPI();
    console.log('Current Guest Data:', this.guestsAPI);
    this.roles=[{ name: 'student', code: 'NY' },
      { name: 'employee', code: 'LA' }]
    this.initForm();
    // this.selectedBeds=[];
    // this.maxGuests = this.bookingForm.get('guests')?.value || 1;
    $('.modal').on('shown.bs.modal', () => {
      this.openModalsCount++;

    }).on('hidden.bs.modal', () => {
      this.openModalsCount--;
      if (this.openModalsCount > 0) {
        $('body').addClass('modal-open');
      } else {
        $('body').removeClass('modal-open');
      }
    });
    this.items = [
      { label: 'Select your need' },
      { label: 'Enter guests details' },
      { label: 'Booking summary' },

    ];
    // this.initializeIntlTelInput('#bookingphone', this.bookingForm);

    this. onWindowScroll()
    this.getApartmentDetails();
    this.checkViewportWidth();
    this.fetchFaqs();


    //////////////////////////////////////////////////////////update checkout/in ////////////////////////////////////
    // this.apartmentSearchService.requestData$.subscribe((data) => {
    //   this.requestDataFromSearch = data;
    //   console.log('Shared Request Data From Search:', this.requestDataFromSearch);
    //   if(this.requestDataFromSearch.checkIn||this.requestDataFromSearch.checkOut){
    //     this.checkinDate=this.requestDataFromSearch.checkIn
    //     this.checkoutDate=this.requestDataFromSearch.checkOut
    //     this.selectedItem=this.requestDataFromSearch.guests

    //   }else {
    //     const checkoutDatee = new Date( this.checkinDate);
    //     checkoutDatee.setMonth(checkoutDatee.getMonth() + this.aprt.min_Stay);
    
         
    //     const formattedCheckoutDate = checkoutDatee.toISOString().split('T')[0];
    
         
    //     this.checkoutDate = formattedCheckoutDate;
    //     console.log( this.checkoutDate)
    //   }
      
    //   console.log(this.checkinDate, this.checkoutDate)
    // });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // this.addMarker(this.aprt);

    this.loginForm = this.fb.group({
      mobile: '',

      email: '',
      password: [''],

    } );

    // this.bookingForm = this.fb.group({
    //   mobile: '',


    // } );


    // const inputb = document.querySelector("#phoneb");

    // if (inputb) {
    //   const iti = intlTelInput(inputb, {
    //     initialCountry: "de",
    //     preferredCountries: ["de", "us", "gb"],
    //     separateDialCode: true,
    //     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    //   });


    //   inputb.addEventListener('blur', () => {
    //     let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    //     if (fullPhoneNumber.startsWith("+")) {
    //       fullPhoneNumber = fullPhoneNumber.substring(1);
    //     }
    //     console.log("Full phone number:", fullPhoneNumber);
    //     this.bookingForm.patchValue({ mobile: fullPhoneNumber });
    //     console.log("Updated mobile field in the form:", this.bookingForm.value.mobile);
    //      console.log(typeof( this.bookingForm.value.mobile))
    //   });
    // } else {
    //   console.error("The phone input element was not found.");
    // }

    if(localStorage.getItem('token')&&localStorage.getItem('userName')&&localStorage.getItem('userToken')){
      this.getProfileData();
      console.log('signed in')
      // this. loadWishList()
       
    }


    const input = document.querySelector("#phoneid");

    if (input) {
      const iti = intlTelInput(input, {
        initialCountry: "de",  // الدولة الافتراضية
        preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
        separateDialCode: true,  // فصل كود الدولة
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        useFullscreenPopup: false
      });

      // حدث عند فقدان التركيز على الحقل
      input.addEventListener('blur', () => {
        // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        let fullPhoneNumber = iti.getNumber();


        if (fullPhoneNumber.startsWith("+")) {
          fullPhoneNumber = fullPhoneNumber.substring(1);  // إزالة رمز "+"
        }
        console.log("Full phone number:", fullPhoneNumber);
        this.loginForm.patchValue({ mobile: fullPhoneNumber });
        console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
         console.log(typeof( this.loginForm.value.mobile))
      });


      // Handle 'countrychange' event to update the flag and dial code
input.addEventListener("countrychange", function() {
  // Clear the previous flag and dial code
  const flagContainer = document.querySelector(".iti__selected-flag");
  const dialCodeElement = document.querySelector(".iti__dial-code");
 console.log(flagContainer,dialCodeElement)
  // Remove previous flag and code visually
  if (flagContainer) {
      flagContainer.classList.remove("iti__selected-flag");
  }
  if (dialCodeElement) {
      dialCodeElement.textContent = ''; // Clear the dial code
  }

  // Get the new country data and update the flag and code
  const selectedCountryData = iti.getSelectedCountryData();

  // Reapply the new flag and dial code
  if (flagContainer) {
      flagContainer.classList.add("iti__selected-flag"); // Re-add flag class
      dialCodeElement!.textContent = "+" + selectedCountryData.dialCode; // Set the new dial code
  }

  // Optional: Log the new selected country and dial code
  console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
});

    } else {
      console.log("The phone input element was not found.");
    }


   this.host=true;
  }

  ////////////////////////////////////////////////////updates on booking and checkin/out dates//////////////////////////////////


  testcheckBedAvailability(beds: any[], checkin: string, checkout: string): any[] {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
  
    const minimumDurationInDays = 90; // 3 months
    const oneDay = 24 * 60 * 60 * 1000;
  
    return beds.map((bed) => {
      let isAvailable = false;
      const bookedDates = bed.beds_Booked_Dates;
  
      // Sort the booked dates array by 'from' dates for easier comparisons
      bookedDates.sort((a: any, b: any) => new Date(a.from).getTime() - new Date(b.from).getTime());
  
      if (bookedDates.length === 0) {
        // No bookings, bed is available
        isAvailable = true;
      } else {
        // Check against the earliest `from` date
        const earliestFromDate = new Date(bookedDates[0].from);
        if (checkinDate < earliestFromDate && checkoutDate < earliestFromDate) {
          // Check minimum booking duration
          const durationInDays = (checkoutDate.getTime() - checkinDate.getTime()) / oneDay;
          if (durationInDays >= minimumDurationInDays) {
            isAvailable = true;
          }
        } else {
          // Loop through booked dates to find a gap
          for (let i = 0; i < bookedDates.length; i++) {
            const currentBooking = bookedDates[i];
            const currentFrom = new Date(currentBooking.from);
            const currentTo = new Date(currentBooking.to);
  
            const nextBooking = bookedDates[i + 1];
            const previousTo = i > 0 ? new Date(bookedDates[i - 1].to) : null;
  
            if (
              checkinDate > currentTo &&
              (!nextBooking || checkoutDate < new Date(nextBooking.from)) &&
              (!previousTo || checkinDate > previousTo)
            ) {
              const durationInDays = (checkoutDate.getTime() - checkinDate.getTime()) / oneDay;
              if (durationInDays >= minimumDurationInDays) {
                isAvailable = true;
                break;
              }
            }
          }
        }
  
        // If no gaps are found, check against the last `to` date
        if (!isAvailable) {
          const latestToDate = new Date(bookedDates[bookedDates.length - 1].to);
          if (checkinDate > latestToDate) {
            const durationInDays = (checkoutDate.getTime() - checkinDate.getTime()) / oneDay;
            if (durationInDays >= minimumDurationInDays) {
              isAvailable = true;
            }
          }
        }
      }
  
      // Add `isAvailable` property to the bed object
      return {
        ...bed,
        isAvailable,
        availableAfter: isAvailable
          ? null
          : new Date(
              Math.max(...bookedDates.map((booking: any) => new Date(booking.to).getTime()))
            ).toISOString(),
      };
    });
  }




 updateBedAvailability(apartmentRooms: any[], checkin: string, checkout: string): void {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    console.log(checkinDate,checkoutDate)
    
    // const minimumDurationInDays = this.minStay * 30;
    
    const oneDay = 24 * 60 * 60 * 1000;


     // Calculate dynamic minimum duration
  const calculateMinimumStay = (minStay: number): number => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setMonth(currentDate.getMonth() + minStay);
    return Math.ceil((futureDate.getTime() - currentDate.getTime()) / oneDay);
  };

  const minimumDurationInDays = calculateMinimumStay(this.minStay);
  
    apartmentRooms.forEach((room: any) => {
      room.room_Beds.forEach((bed: any) => {
        let isAvailable = false;
        const bookedDates = bed.beds_Booked_Dates || [];
  
        // Sort booked dates by 'from' date
        bookedDates.sort((a: any, b: any) => new Date(a.from).getTime() - new Date(b.from).getTime());
  
        if (bookedDates.length === 0) {
          // No bookings, bed is available
          isAvailable = true;
        } else {
          const earliestFromDate = new Date(bookedDates[0].from);
  
          // Check if the requested range is completely before the earliest booking
          if (checkinDate < earliestFromDate && checkoutDate < earliestFromDate) {
            const durationInDays = (checkoutDate.getTime() - checkinDate.getTime()) / oneDay;
            if (durationInDays >= minimumDurationInDays) {
              isAvailable = true;
            }
          } else {
            // Loop through the booked dates to find a valid gap
            for (let i = 0; i < bookedDates.length; i++) {
              const currentBooking = bookedDates[i];
              const currentTo = new Date(currentBooking.to);
  
              const nextBooking = bookedDates[i + 1];
              const nextFrom = nextBooking ? new Date(nextBooking.from) : null;
  
              if (
                checkinDate > currentTo &&
                (!nextFrom || checkoutDate < nextFrom) &&
                (checkoutDate.getTime() - checkinDate.getTime()) / oneDay >= minimumDurationInDays
              ) {
                isAvailable = true;
                break;
              }
            }
  
            // Check against the last `to` date if no gap is found
            if (!isAvailable) {
              const latestToDate = new Date(bookedDates[bookedDates.length - 1].to);
              if (checkinDate > latestToDate) {
                const durationInDays = (checkoutDate.getTime() - checkinDate.getTime()) / oneDay;
                if (durationInDays >= minimumDurationInDays) {
                  isAvailable = true;
                }
              }
            }
          }
        }
  
        // Add availability status to the bed
        bed.isAvailable = isAvailable;
        bed.availableAfter = isAvailable
          ? null
          : new Date(
              Math.max(...bookedDates.map((booking: any) => new Date(booking.to).getTime()))
            ).toISOString().split('T')[0] ;  
      });
    });
  }
  
  // Example usage:
  // const apartmentRooms = [
  //   {
  //     basically_Room_Name: "Room 1",
  //     bed_Price: 450,
  //     room_Beds: [
  //       {
  //         bed_ID: "1",
  //         bookedDate: [
  //           { from: "2024-12-01", to: "2024-12-30" },
  //           { from: "2025-01-01", to: "2025-01-31" },
  //         ],
  //       },
  //       {
  //         bed_ID: "2",
  //         bookedDate: [],
  //       },
  //     ],
  //   },
  //   {
  //     basically_Room_Name: "Room 2",
  //     bed_Price: 550,
  //     room_Beds: [
  //       {
  //         bed_ID: "3",
  //         bookedDate: [
  //           { from: "2024-11-15", to: "2025-01-15" },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  
  // const checkin = "2025-02-01";
  // const checkout = "2025-05-01";
  
  // updateBedAvailability(this.aprt.apartment_Rooms, checkin, checkout);
  // console.log(apartmentRooms);
  
  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  host:boolean=false;

  displayModal:any;
  displayModalbooking:any;
  displayModalsuccess:any;
  openModals(){
    // this.visibleBooking=false;
     this.updateBedAvailability(this.aprt.apartment_Rooms, this.checkinDate, this.checkoutDate);
  console.log(this.aprt.apartment_Rooms, this.checkinDate,this.checkoutDate);

  if (Array.isArray(this.aprt.apartment_Rooms)&&this.checkinDate&&this.checkoutDate) {
    let nobedAvailableNEW=0;
  for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {


  

      for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
        
        // bedno++;
        if(this.aprt.apartment_Rooms[i].room_Beds[x].isAvailable){
          nobedAvailableNEW++;
          this.checkaprt=true;

        }else{
          this.checkaprt=false;
        }
        
      }
  
      // console.log(this.selectedItem,nobedAvailableNEW)


  }
  console.log(this.selectedItem,nobedAvailableNEW)

  if(this.selectedItem>nobedAvailableNEW){
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: `Guest count must match available beds. Beds available for the selected dates: ${nobedAvailableNEW}.`,
      life: 6000
  });
  return;
  }
}
  //////////////////////////////////////////////////////////////////
    this.loginMethod === 'whatsApp';
    const checkinDateString = this.bookingForm.get('bookingStartDate')?.value;
    const checkoutDate = new Date(this.checkoutDate);  // Convert checkoutDate to Date object
console.log(this.checkinDate,this.checkoutDate)
    // Convert the check-in date string to a Date object
    const checkinDate = new Date(checkinDateString);

    // Calculate the date 5 months after the check-in date
    const minCheckoutDate = new Date(checkinDate);
    // minCheckoutDate.setMonth(minCheckoutDate.getMonth() + 1);
    minCheckoutDate.setMonth(minCheckoutDate.getMonth() + this.minStay);

  // if( this.checkinDate<new Date().toISOString().slice(0, 10) ){

  //           this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: "Please change check-in date"
  //       });
  //       return;
  //   }
    // Now both checkoutDate and minCheckoutDate are Date objects, so the comparison will work

    if(localStorage.getItem('token')){
      // if(this.selectedGuest!=='1 guest' && this.selectedGuest!=='2 guests' &&this.selectedGuest!=='3 guests' &&this.selectedGuest!=='4 guests' ){
        if(!this.allResponse.can_Request){

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: " you can not create booking on this apartment for now"
        });
        return;

        }else if(this.selectedItem < 1 ){
        this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must choose number of guests' });
      }else if(this.checkoutDate===''||this.checkinDate===''){
        this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must choose check in and check out dates' });
      }else  if( this.checkinDate<new Date().toISOString().slice(0, 10) ){
        //  console.log('hereeeeeeeeeeeeeeeeeeeeeeee')
              this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: "Please change check-in date"
          });
          return;
      }
      else{

        if (checkoutDate >= minCheckoutDate) {
          this.bookingForm.get('bookingEndDate')?.setValue(checkoutDate);
        } else {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Please change check-out date, Minimum period must be  ${this.aprt.min_Stay} month`
          });
          return;
        }

        this.displayModalbooking='block';
      }

    }else{
      // this.displayModal='block';
      Globals.authg=true;
      this.auth=Globals.authg;
      this.userService.openModal();
    this.visibleBooking=false;
    // this.visibleBooking='none';


    // this.openauth();
    }


  }
  openauth(){
    Globals.authg=true;

    this.auth= Globals.authg
    console.log('hellooooo')
  }
  auth:boolean=false;
  openModalsuccess(){
    this.displayModalsuccess='block';
    this.displayModalbooking='none';
    this.displayModal='none';
 }
 openModalbooking(){
  if(this.selectedItem < 1 ){
    this.messageService.add({ severity: 'error', summary: 'Booking Failed', detail: 'you must choose number of guests' });
  }else{

    this.displayModalbooking='block';
  }



  setTimeout(() => {
    this.initializeIntlTelInput('#bookingphone', this.bookingForm);
  }, 0);
}
onCloseQrModal() {
  this.displayModalsuccess='none';
    this.displayModalbooking='none';
    this.displayModal='none';
}
onCloseModal() {

    this.displayModalbooking='none';

}

ngAfterViewInit(): void {

  this.initializeIntlTelInput('#bookingphone', this.bookingForm);

//   const input = document.querySelector("#phoneid");

//   if (input) {
//     const iti = intlTelInput(input, {
//       initialCountry: "de",
//       preferredCountries: ["de", "us", "gb"],
//       separateDialCode: true,
//       utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//     });


//     input.addEventListener('blur', () => {
//       let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
//       if (fullPhoneNumber.startsWith("+")) {
//         fullPhoneNumber = fullPhoneNumber.substring(1);
//       }
//       console.log("Full phone number:", fullPhoneNumber);
//       this.loginForm.patchValue({ mobile: fullPhoneNumber });
//       console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
//        console.log(typeof( this.loginForm.value.mobile))
//     });


// input.addEventListener("countrychange", function() {

//   const flagContainer = document.querySelector(".iti__selected-flag");
//   const dialCodeElement = document.querySelector(".iti__dial-code");
//   console.log(flagContainer,dialCodeElement)

//   if (flagContainer) {
//       flagContainer.classList.remove("iti__selected-flag");
//   }
//   if (dialCodeElement) {
//       dialCodeElement.textContent = '';
//   }


//   const selectedCountryData = iti.getSelectedCountryData();


//   if (flagContainer) {
//       flagContainer.classList.add("iti__selected-flag");
//       dialCodeElement!.textContent = "+" + selectedCountryData.dialCode;
//   }


//   console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
// });

//   } else {
//     console.error("The phone input element was not found.");
//   }

  this.loginForm.reset();





  if (this.activeIndex === 1) {
    setTimeout(() => {
      this.initializeIntlTelInput('#bookingphone', this.bookingForm);
    }, 0);
  }


}

 


inputValues: { [key: string]: string } = {};
private initializeIntlTelInputbook(selector: string, form: FormGroup ,index:number) {
  console.log('helllloo')
  const input = document.querySelector(selector) as HTMLInputElement;
  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: "de",
      preferredCountries: ["de", "us", "gb"],
      separateDialCode: true,
      // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
      searchCountry:true,
    });
///////////////////////////////////////////////////////////////////////test
     // قم بتعيين الرقم الحالي من guestsAPI
     const phoneNumber = this.guestsAPI[index]?.guest_WA_No;
     if (phoneNumber) {
       iti.setNumber(`+${phoneNumber}`); // تعيين الرقم الحالي
     }
///////////////////////////////////////////////////////////////////////test

    console.log('After querying the input element:', input);
    input.addEventListener('blur', () => {
      
      let fullPhoneNumber = iti.getNumber();
     
      if (fullPhoneNumber.startsWith("+")) {
        fullPhoneNumber = fullPhoneNumber.substring(1);
      }
      // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);

      // طباعة الرقم للتأكد
      console.log("Full phone number:", fullPhoneNumber);
    
      console.log("Full phone number:", fullPhoneNumber);
      
      // form.patchValue({ mobile: fullPhoneNumber });
      this.guestsAPI[index] = {
        ...this.guestsAPI[index],
        guest_WA_No: fullPhoneNumber
      };
       
      ///////////////////////////////////////////////////////////////////////test
        
  // const selectedCountryData = iti.getSelectedCountryData();
  // const dialCode = selectedCountryData.dialCode; 

  // console.log('Selected country data:', selectedCountryData);

  //     if (fullPhoneNumber.startsWith(`${dialCode}`)) {
  //       fullPhoneNumber = fullPhoneNumber.replace(`${dialCode}`, '').trim();
  //     }

      
  //    const phoneNumber = this.guestsAPI[index]?.guest_WA_No;
  //    if (phoneNumber) {
  //      iti.setNumber(`+${phoneNumber}`); 
  //    }


  // استخراج كود الدولة فقط
  const selectedCountryData = iti.getSelectedCountryData();
  const countryCode = selectedCountryData.dialCode;

  // إزالة كود الدولة فقط عند العرض في الحقل (input)
  const phoneNumberWithoutCountryCode = fullPhoneNumber.startsWith(countryCode)
    ? fullPhoneNumber.substring(countryCode.length)
    : fullPhoneNumber;

  // تعيين الرقم بدون كود الدولة في الحقل فقط
  input.value = phoneNumberWithoutCountryCode;
  this.inputValues[index]=phoneNumberWithoutCountryCode;

  console.log("Phone number without country code (display only):", phoneNumberWithoutCountryCode);
    
   

  


      // iti.setNumber(``);
 
//   const phoneNumber = this.guestsAPI[index]?.guest_WA_No;
  
//   if (this.guestsAPI[index]) {
//     this.guestsAPI[index].guest_WA_No = '';
// }

//       iti.setNumber(`+${phoneNumber}`);
//       console.log(`+${phoneNumber}`)
///////////////////////////////////////////////////////////////////////test
      // iti.setNumber("");
      // console.log('...')
      // iti.setNumber(`+${fullPhoneNumber}`);
      
     
      // this.newGuestArr[index] = {
      //   ...this.guestsAPI[index],
      //   guest_WA_No: fullPhoneNumber
      // };

      // Patch the updated guestsAPI array to the form
      form.patchValue({ guestss: this.newGuestArr });

     

      console.log("Updated guestsAPI:", this.guestsAPI);
      console.log("Updated guestsAPI:", this.newGuestArr);

      console.log("Updated mobile field in the form:", form.value.guestss);

      console.log("Updated mobile field in the form:", form.value.mobile);
      console.log(typeof(form.value.mobile));
    });


    // Handle 'countrychange' event to update the flag and dial code
input.addEventListener("countrychange", function() {
  // Clear the previous flag and dial code
  const flagContainer = document.querySelector(".iti__selected-flag");
  const dialCodeElement = document.querySelector(".iti__dial-code");
   console.log(flagContainer,dialCodeElement)
  // Remove previous flag and code visually
  if (flagContainer) {
      flagContainer.classList.remove("iti__selected-flag");
  }
  if (dialCodeElement) {
      dialCodeElement.textContent = '';  
  }

  // Get the new country data and update the flag and code
  const selectedCountryData = iti.getSelectedCountryData();

  // Reapply the new flag and dial code
  if (flagContainer) {
      flagContainer.classList.add("iti__selected-flag"); // Re-add flag class
      dialCodeElement!.textContent = "+" + selectedCountryData.dialCode; // Set the new dial code
  }

  // Optional: Log the new selected country and dial code
  console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
});

  } else {
    console.error(`The phone input element with selector '${selector}' was not found.`);
  }
}
private initializeIntlTelInput(selector: string, form: FormGroup  ) {

  const input = document.querySelector(selector);
  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: "de",
      preferredCountries: ["de", "us", "gb"],
      separateDialCode: true,
      // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
      searchCountry:true,
    });
    console.log('After querying the input element:', input);
    input.addEventListener('blur', () => {
      // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
      let fullPhoneNumber = iti.getNumber();

      if (fullPhoneNumber.startsWith("+")) {
        fullPhoneNumber = fullPhoneNumber.substring(1);
      }
      console.log("Full phone number:", fullPhoneNumber);
      // form.patchValue({ mobile: fullPhoneNumber });
      this.guestsAPI = this.guestsAPI.map((guest: { [key: string]: any })  => ({
        ...guest,
        guest_WA_No: fullPhoneNumber
      }));
      // this.newGuestArr=[...this.guestsAPI ]

      // Patch the updated guestsAPI array to the form
      form.patchValue({ guestss: this.newGuestArr });

      console.log("Updated mobile field in the form:", form.value.guestss);

      console.log("Updated mobile field in the form:", form.value.mobile);
      console.log(typeof(form.value.mobile));
    });
  } else {
    console.error(`The phone input element with selector '${selector}' was not found.`);
  }
}


  isVisible:boolean=true;

  @HostListener('window:scroll', [])
onWindowScroll() {
  if(this.host===true){
    const sections = document.getElementsByClassName('section-to-watch');
    this.isVisible = !Array.from(sections).some(section => {
      const rect = (section as HTMLElement).getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if at least half of the section is within the viewport
      const isSectionVisible = (
        rect.top < windowHeight / 0.9 && rect.bottom > windowHeight / 2
      );

      //   console.log(this.isVisible);
      // console.log(sections);
      // console.log(isSectionVisible);

      return isSectionVisible;
    });
    this.checkViewportWidth();
  }



}



  onStepChange(event: any) {
    this.activeIndex = event.index;
  }
  showBooking:boolean=true;

  onsubmitLogin(){
  this.showBooking=true;
  }

  // Calculate the first bed availability date
//  getFirstAvailableBedDate(apartmentRooms:any) {
//   let earliestDate:any = null;

//   apartmentRooms.forEach((room:any) => {
//     room.room_Beds.forEach((bed:any) => {
//       if (bed.bed_Available_From) {
//         const bedDate = new Date(bed.bed_Available_From);
//         if (!earliestDate || bedDate < earliestDate) {
//           earliestDate = bedDate;
//         }
//       }
//     });
//   });

//   return earliestDate;
// }

getFirstAvailableBedDate(apartmentRooms: any): Date | null {
  let earliestDate: Date | null = null;

  if (!Array.isArray(apartmentRooms)) {
    console.error("apartmentRooms is not an array:", apartmentRooms);
    return null;
  }

  apartmentRooms.forEach((room: any) => {
    room.room_Beds.forEach((bed: any) => {
      if (bed.beds_Booked_Dates && bed.beds_Booked_Dates.length > 0) {
        // Get the latest "to" date from the bed's bookings
        bed.beds_Booked_Dates.forEach((booking: any) => {
          const bookingEndDate = new Date(booking.to);
          if (!earliestDate || bookingEndDate < earliestDate) {
            earliestDate = bookingEndDate;
          }
        });
      } else {
        // If no bookings exist, use the current date as available
        const today = new Date();
        // console.log(today,new Date(this.aprt.available_From))
        if (!earliestDate || (today < earliestDate && today >=new Date(this.aprt.available_From)) ) {
          earliestDate = today;
        }else if(today <new Date(this.aprt.available_From)){
          earliestDate =new Date(this.aprt.available_From);
             
        }
      }
    });
  });

  return earliestDate;
}

checkNotAvailable(){
  const availableTo = new Date(this.aprt.available_To);
  this.firstAvailableDate=this.getFirstAvailableBedDate(this.aprt.apartment_Rooms)
  // console.log(availableTo,this.firstAvailableDate)
  if(availableTo<=this.firstAvailableDate){
   return true;
  }
  return false;
}



  // get apartment details
  apt_UUID:any;
  allResponse:any;
  aprt: any = {};
  aprt_Imgs: any[] = [];
  trasponrts: any[] = [];
  rent_Rules: any[] = [];
  features: any[] = [];
  facilities: any[] = [];
  contract_Main: any = {};
  bath_Room: any[] = [];
  backup_Info: any = {};
  owner_contract_file_name: string = '';
  tenant_contract_file_name: string = '';
  centerr: { lat: number; lng: number } = { lat: 0, lng: 0 };
  kitchen_Tools: any[] = [];
  tenant: any = {};
  rating_total: number = 0;
  rating_count: number = 0;
  request_code: string = '';
  apartmentsEquipment: any = {};
  apartmentsContract: any = {};
  apartmentsCheckRules: any = {};
  currentImage: string = '../../../assets/images/apartmentImages/default_apartment.jpg';
  noAllbed:any;
  bedsPrice=0;
  bedAvailable=0;
  checkaprt:boolean=true;

  firstAvailableDate:any;
  minDate:any;
  maxCheckOut:any;
  minStay:any;
  checkNotAvailableVar:any;
  getApartmentDetails() {

    this.subscriptions.push(
      this.apartmentService.getApartDetail(this.apt_UUID).subscribe(
        (res) => {
          console.log(res)
          this.allResponse=res;
          this.aprt = res.apartment_Basic_Info || {};
          this.checkNotAvailableVar=this.checkNotAvailable()
          this. loadWishList()
          ///////////////////minstay///////////////////////
          let min_stay=this.aprt.min_Stay
          this.minStay=min_stay-1
          console.log(this.minStay,this.aprt.min_Stay)
          // if(min_stay===1){
          //   this.minStay=min_stay
          // }else if(min_stay>1){

          // }
          ///////////////////minstay///////////////////////

          // this.maxCheckOut= this.aprt.available_To
          // this.maxCheckOut= new Date( this.maxCheckOut.getTime() - this.maxCheckOut.getTimezoneOffset() * 60000).toISOString().split('T')[0]
          // console.log(this.maxCheckOut)

          // Create a copy of the value instead of holding a reference
let maxCheckOut = new Date(this.aprt.available_To);

// Adjust the timezone offset
maxCheckOut = new Date(maxCheckOut.getTime() - maxCheckOut.getTimezoneOffset() * 60000);

// Convert to ISO format and extract the date part
this.maxCheckOut = maxCheckOut.toISOString().split('T')[0];

// Log the result
console.log(this.maxCheckOut);

          /////////////////////////fix checkindate///////////////////
          
  
          // if(new Date() <new Date(this.aprt.available_From)){
          //   this.checkinDate =new Date(this.aprt.available_From).toISOString().slice(0, 10);
               
          // }


////////////////////////////////////////////////////////////////////////

          this.firstAvailableDate=this.getFirstAvailableBedDate(this.aprt.apartment_Rooms)
          console.log(this.firstAvailableDate)

          /////////////test////////////////
          const today = new Date();
          this.minDate = this.firstAvailableDate.toISOString().split('T')[0];
          ////////////////////////////////////////
          if(this.checkoutDate===''){

              /////////////////////////fix checkindate///////////////////
          
  
          if(new Date() <new Date(this.aprt.available_From)){
            this.checkinDate =new Date(this.aprt.available_From).toISOString().slice(0, 10);
               
          }


////////////////////////////////////////////////////////////////////////
            let checkoutDatee = new Date( this.checkinDate);
            console.log(checkoutDatee)
            console.log(this.minStay)
            // if(this.minStay<0){
            //   this.minStay=0
            // }
            checkoutDatee.setMonth(checkoutDatee.getMonth() + this.minStay);
            console.log(checkoutDatee)

            if(new Date(checkoutDatee) >new Date(this.aprt.available_To)){
              checkoutDatee =new Date(this.aprt.available_To) ;
                 
            }
            
            const d = new Date(checkoutDatee.getTime() - checkoutDatee.getTimezoneOffset() * 60000);///////added new to fix miss day


   
            const formattedCheckoutDate = d.toISOString().split('T')[0];
        
             
            this.checkoutDate = formattedCheckoutDate;
            console.log( this.checkoutDate)

      //////update guest
          //   this.updateBedAvailability(this.aprt.apartment_Rooms, this.checkinDate, this.checkoutDate);
          //   console.log(this.aprt.apartment_Rooms);
          
          //   if (Array.isArray(this.aprt.apartment_Rooms)&&this.checkinDate&&this.checkoutDate) {
          //     let nobedAvailableNEW=0;
          //   for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {
          
          
            
          
          //       for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
                  
                   
          //         if(this.aprt.apartment_Rooms[i].room_Beds[x].isAvailable){
          //           nobedAvailableNEW++;
          //         }else{
          //           this.checkaprt=false;
          //         }
                  
          //       }
            
               
          
          
          //   }
          //   console.log(this.selectedItem,nobedAvailableNEW)
          //   this.guests = []; 
            
          //     for (let i = 1; i <= nobedAvailableNEW; i++) {
          
          //     this.guests.push({ label: `${i} Guest${i > 1 ? 's' : ''}`, value: i });
          //   }
            
          // }
          }
          
/////////////////////////////////////////////////////////////////////////////////////////////////

          // this.aprt_Imgs = this.aprt.apartment_Images || [];
          this.aprt_Imgs = this.aprt.apartment_Images
  ? this.aprt.apartment_Images.map((image: any) => image.image_Path)
  : [];
          this.trasponrts = this.aprt.apartment_Transports || [];
          this.rent_Rules = res.apartment_Check_Rules?.apt_rules || [];
          this.features = res.apartment_Equipments?.apartment_Features || [];
          this.facilities = res.apartment_Equipments?.apartment_Facilites || [];
          this.contract_Main = res.apartment_Contract || {};
          this.bath_Room = res.apartment_Equipments?.bathroom_Details || [];
          this.backup_Info = res.apartment_Backup_Info || {};
          this.owner_contract_file_name = res.file_Name;
          this.tenant_contract_file_name = res.tenant?.file_Name || '';
          this.center = {
            lat: this.aprt.apartment_Lat || 0,
            lng: this.aprt.apartment_Long || 0,
          };

          this.markerPosition = {
            lat: this.aprt.apartment_Lat || 0,
            lng: this.aprt.apartment_Long || 0,
          };
          console.log(this.center,this.markerPosition)
          this.kitchen_Tools = res.apartment_Equipments?.kitchen_Details || [];
          this.tenant = res.tenant || {};
          this.rating_total = res.rating_Total;
          this.rating_count = res.rating_Count;
          this.request_code = res.request_Code;
          this.transform(this.aprt.apartment_VideoLink || '');

          this.apartmentsEquipment = res.apartment_Equipments || {};
          this.apartmentsContract = res.apartment_Contract || {};
          this.apartmentsCheckRules = res.apartment_Check_Rules || {};
          if (this.aprt.apartment_Description) {
            this.truncatedDescription = this.getTruncatedDescription(this.aprt.apartment_Description, 100);
          }
          this.visibleTransports = this.aprt.apartment_Transports.slice(0, 1);
          this.currentImage = this.aprt_Imgs[0].includes('https') ? this.aprt_Imgs[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
          if(!this.aprt.apartment_RentBy_Apartment){
            this.checkaprt=false;
          }
          if (Array.isArray(this.aprt.apartment_Rooms)) {
            let bedno = 0;
            let nobedAvailable=0

            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {


              // if (!this.aprt.apartment_Rooms[i].room_Type.includes('Shared Area')) {

              //   this.roomsBedRoom.push(this.aprt.apartment_Rooms[i]);
              //   for (let x = 0; x < this.roomsBedRoom[i].room_Beds.length; x++) {
              //     bedno++;

              //     this.roomsBedRoom[i].room_Beds[x] = { ...this.roomsBedRoom[i].room_Beds[x], "bed_number": bedno };

              //   }
              // } else {

                for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
                  bedno++;
                  if(this.aprt.apartment_Rooms[i].room_Beds[x].bed_Available){
                    nobedAvailable++;
                  }else{
                    this.checkaprt=false;
                  }
                  // this.aprt.apartment_Rooms[i].room_Beds[x] = { ...this.aprt.apartment_Rooms[i].room_Beds[x], "bed_number": bedno };
                }
                // this.roomsLiving.push(this.aprt.apartment_Rooms[i]);


            }
            this.noAllbed=bedno;
            this.bedAvailable=nobedAvailable;
            this.updateGuests();
            // this.getProfileData();

          if (this.aprt && this.aprt.apartment_Rooms) {
            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {

                  this.bedsPrice += this.aprt.apartment_Rooms[i].bed_Price * this.aprt.apartment_Rooms[i].beds_No || 0;

            }
          }


          } else {
            console.warn('apartment_Rooms is not an array:', this.aprt.apartment_Rooms);
          }



        },
        (error) => {
          console.error('Error fetching apartment details:', error);
        }
      )
    );

    /////////////////////////////////////////
//     let roomDisabled = false;

// for (let i = 0; i < this.aprt.apartment_Rooms; i++) {
//   const bed = this.aprt.apartment_Rooms.room_Beds[i];

//   if (!bed.bed_Available) {

//     roomDisabled = true;

//   }
// }

// this.aprt.apartment_Rooms.disabled = roomDisabled;

    /////////////////////////////////
  }
  sanitizedVideoUrl: SafeResourceUrl | null = null;
  sanitized360DUrl: SafeResourceUrl | null = null;
  openVideo(videoURL: string) {
    this.sanitizedVideoUrl = this.transform(videoURL);  
  }
  open360Video(videoURL: string) {
    this.sanitized360DUrl = this.transform(videoURL);
  }

  transform(videoURL: string) {
    let srclink = videoURL;
    if (srclink?.startsWith('https://www.youtube.com/watch?v=')) {
      let embedlink = srclink?.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else if (srclink?.startsWith('https://youtu.be')) {
      let embedlink = srclink?.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srclink);
    }
  }

  transform2(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  truncatedDescription: string = '';
  isFullDescription: boolean = false;
  getTruncatedDescription(text: string, wordLimit: number): string {
    const words = text.split(' ');
    // console.log(words)
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  toggleDescription(event: Event): void {
    event.preventDefault();
    this.isFullDescription = true;
  }


  showAllTransports: boolean = false;
  visibleTransports: any[] = [];
  showMore(event: Event): void {
    event.preventDefault();
    this.showAllTransports = true;
    this.visibleTransports = this.aprt.apartment_Transports;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkViewportWidth();
  }

  checkViewportWidth(): void {
    const vw = window.innerWidth;

    if (vw <= 950) {
       this.isVisible=true;


    }
  }

showimages:boolean=false;
currentIndex: number = 0;

openModal(): void {
  this.showimages = true;
  console.log(this.showimages);
}

closeModal(): void {
  this.showimages = false;
}
nextImage(): void {
  this.currentIndex = (this.currentIndex + 1) % this.aprt_Imgs.length;
}

prevImage(): void {
  this.currentIndex = (this.currentIndex - 1 + this.aprt_Imgs.length) % this.aprt_Imgs.length;
}






passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  if (!password) {
    return null;
  }


  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
  return valid ? null : { 'weakPassword': true };
}


onLoginSubmit(): void {
  console.log(this.loginForm)
    let mobileAPI='';
    let pass=this.loginForm.value.password;

    if (this.loginForm.valid) {

      // if(this.loginForm.value.mobile===null){
      //   mobileAPI=this.loginForm.value.email;
      // }else{
      //   mobileAPI=this.loginForm.value.mobile;
      // }
      if(this.loginMethod==='email'){
        mobileAPI=this.loginForm.value.email;
      }else if(this.loginMethod==='whatsApp'){
        mobileAPI=this.loginForm.value.mobile;
      }

      console.log('Sending user data to API:',this.loginForm.value.mobile,this.loginForm.value.email );
      this.userService.loginUser(mobileAPI,pass).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
          console.log('User account created successfully', response);
          localStorage.setItem('token', response.token);

          this.getProfileData();

          this.authService.login(this.namelogin, response.token);
          // if(this.selectedItem < 1 ){
          // this.openModalbooking()
          // }else{
          //   this.onCloseQrModal();
          // }
          this. displayModal='none'

        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error('Error creating user account', error);

        }
      );
    } else {
      console.error('Form is invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
      this.loginForm.markAllAsTouched();

  }
}
profileData: any;
getProfileData(): void {
  this.userService.getProfile().subscribe(
    data => {
      this.profileData = data;
      console.log('ProfileData :',this.profileData);
      this.namelogin= this.profileData[0]?.fullName;
      this.emaillogin=this.profileData[0]?.email;
      this.phonelogin=this.profileData[0]?.mobile;
      const token = localStorage.getItem('token') || ''; // Fallback to an empty string if the token is null
      this.authService.login(this.namelogin, token);
    },
    error => {
      console.error('There was an error!', error);
    }
  );
}











// guests: string[] = ['1 guest', '2 guests', '3 guests', '4 guests'];
guests: any[] = [];
updateGuests() {
  this.guests = []; 
  // for (let i = 1; i <= this.bedAvailable; i++) {
    for (let i = 1; i <= this.noAllbed; i++) {

    this.guests.push({ label: `${i} Guest${i > 1 ? 's' : ''}`, value: i });
  }
}

onGuestSelect(event: any) {
  
  console.log('Selected guest:', event.value);

//   if (Array.isArray(this.aprt.apartment_Rooms)) {
//     let nobedAvailableNEW=0;
//   for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {


  

//       for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
        
       
//         if(this.aprt.apartment_Rooms[i].room_Beds[x].isAvailable){
//           nobedAvailableNEW++;
//         }else{
//           this.checkaprt=false;
//         }
        
//       }
  
//       console.log(event.value,nobedAvailableNEW)


//   }
//   console.log(event.value,nobedAvailableNEW)

//   if(event.value>nobedAvailableNEW){
//     this.messageService.add({
//       severity: 'info',
//       summary: 'Info',
//       detail: `Guest count must match available beds. Beds available for the selected dates: ${nobedAvailableNEW}.`,
//       life: 6000
//   });
//   }
// }
  // let guestString = event.value ?? '';
  // let guestNumberMatch = guestString.match(/\d+/);
  // let guestNumber = guestNumberMatch ? parseInt(guestNumberMatch[0], 10) : null;
  this.selectedItem=event.value;
  console.log(this.selectedItem)
  this.selectedBeds=[]
  this.selectedRooms=[]
  this.activeIndex=0;
  this.selectfullaprt=false;
  // هنا يمكنك إضافة الكود الذي تريد تنفيذه عند اختيار عدد الضيوف
}

selectGuest(guest: string) {
    this.selectedGuest = guest;
    console.log( this.selectedGuest)
    this.selectedBeds=[]
    this.selectedRooms=[]
    this.selectfullaprt=false;
}



displayVerify:any

uuidforgot:any;
resetToken:any;
otp:any;
openverifyModal(){


  let mobileAPI=null;

    mobileAPI=this.loginForm.value.mobile;
    console.log(mobileAPI)

  if(mobileAPI===null){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'you must write your phone' });

  }else{



    this.userService.sendForgotPasswordOtp(mobileAPI).subscribe(
      response => {
        // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('OTP sent successfully', response);
        this.uuidforgot=response.uuid;
        this.resetToken=response.reset_Token;
        localStorage.setItem('token', response.reset_Token);

         this.displayModal = 'none';

          this.displayVerify='block'

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error sending OTP', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }
  }

  displayForgetPass:any;

  openForgetModal(){

      this.userService.checkOtp(this.otp, this.uuidforgot).subscribe(
        response => {
          // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
          console.log('OTP verified successfully', response);
          this.displayForgetPass='block';
          this.displayVerify='block'

        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error('Error verifying OTP', error);

        }
      );


  }
  refreshOtp(): void {

    this.userService.refreshOtp(this.uuidforgot).subscribe(
      (response) => {
        console.log('OTP refreshed successfully:', response);
      },
      (error) => {
        console.error('Error refreshing OTP:', error);
      }
    );
  }

  onForgetSubmit(): void {
    const password = this.forgetForm.get('password')?.value;
    const confirmPassword = this.forgetForm.get('confirmPassword')?.value;


    this.userService.resetPassword(password, confirmPassword, this.uuidforgot, this.resetToken).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('Password reset successfully', response);
        this.displayForgetPass='none';
        // Handle success, e.g., navigate to a login page or show a success message
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error resetting password', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }
  onCloseVerifyModal(){
    this.displayVerify='none';
    this.displayForgetPass='none';
  }
  visibleBooking:boolean=false
  // visibleBooking='none'

  showDialog(){
    if(localStorage.getItem('token')){
      this.visibleBooking=true;
    }else{
      // this.openauth()
      this.renderAuthComponent()
    }
    
  //  this.visibleBooking='block';

  }


  get isRedHeart(): boolean {
    return this.allResponse?.is_Wish && !!localStorage.getItem('token');
  }
  


  favoriteApartments: { [key: string]: boolean } = {};
  toggleFavorite(apt_ID: string) {

    if (!localStorage.getItem('token')) {
      this.messageService.add({
        severity: 'info', 
        summary: 'Sign In Required', 
        detail: 'Please sign in to your account to use this feature.'
      });
      return;
    }
    

    if(this.allResponse.is_Wish){
      this.removeWish(this.wishID)
      return;
    }
    // Toggle favorite status
    // this.favoriteApartments[apt_ID] = !this.favoriteApartments[apt_ID];
    this.favoriteApartments[apt_ID] =true;

    // Call the API service

    this.messagingService.requestPermission()
      .then((token:any) => {
        console.log('Device token:', token);
        this.deviceToken=token;
        this.addToWishlist(apt_ID,this.deviceToken);
      })
      .catch((error:any) => {
        console.error('Error getting token:', error);
      });

    // Optionally listen for incoming notifications
    this.messagingService.receiveMessage();
  }

  deviceToken:any;

  addToWishlist(apt_ID: string, device_Token: string) {
    this.bookingService.addToWishlist(apt_ID, device_Token).subscribe(
      (response) => {
        console.log('API call success:', response);
        this.allResponse.is_Wish=true;
        this.loadWishList()
      },
      (error) => {
        console.error('API call error:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
      }
    );
  }



  /////////////////////////////////////////
//social sign/////////////////////
uuid:any;
signInWithGoogle(): void {
  this.socialSign=true;
  // const token = localStorage.getItem('token');
  // if (token) {
  //   console.error('Token not found, redirecting to login');
  //   this.logout();
  //   this.userService.signInWithGoogle();
  // }else{
  //   this.userService.signInWithGoogle();
  // }this.socialSign=true;
  if(!localStorage.getItem('token')){
    this.userService.signInWithGoogle();

     setTimeout(() => {
      this.userService.uuid.subscribe(value => {
        this.uuid = value;
        console.log('Component1 received shared data:', this.uuid);
      });

     if(!localStorage.getItem('token')){
      // this.displayInfo='block';

    }
    this.displayModal='none';
    }, 500);
  }else{
    this.userService.signInWithGoogle();
  }


}
socialSign:boolean=false;
 signUpWithGoogle(): void {

  console.log('sign up')
  this.userService.signInWithGoogle();
  setTimeout(() => {
    if(!localStorage.getItem('token')){
      // this.displayInfo='block';
      // this.displayModalsign='none';
    }

  }, 0);

}


///////////////////////////////////////for share design//////////////////////////////////
displayShareDialog: boolean = false;
// propertyLink: string = 'https://studiflats.de/Togostr 17 studio 1';

 

showShareDialog() {
  this.displayShareDialog = true;
}

copyLink() {
  navigator.clipboard.writeText(this.allResponse.shareLink).then(() => {
    this.messageService.add({ severity: 'success', summary: 'Copied!', detail: 'Link copied to clipboard.' });
  });
}
shareVia(platform: string) {
  const propertyLink = encodeURIComponent(this.allResponse.shareLink); // URL encode the link
  let url: string;

  switch (platform) {
    case 'WhatsApp':
      url = `https://wa.me/?text=${propertyLink}`;
      break;
    case 'Facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${propertyLink}`;
      break;
    case 'Gmail':
      url = `mailto:?subject=Check out this property&body=${propertyLink}`;
      break;
    case 'Messenger':
      url = `https://m.me?link=${propertyLink}`;
      break;
    default:
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: `Sharing on ${platform} is not supported.`,
      });
      return;
  }

  // Open the share URL in a new window
  if (url) {
    window.open(url, '_blank');
  }
}



/////////////////////////////////////////////////////wishlist/////////////////////
wishList:any;
totalData:any;
wishID:any;
 loadWishList() {

  this.messagingService.requestPermission()
  .then((token:any) => {
    console.log('Device token:', token);
    this.deviceToken=token;
    // this.addToWishlist(apt_ID,this.deviceToken);
  })
  .catch((error:any) => {
    console.error('Error getting token:', error);
  });

   this.bookingService.getWishList( 1, 1000,this.deviceToken )
     .subscribe(
       (response) => {
         console.log(response)
         this.wishList = response.data;
          setTimeout(() => {
            // this.wishID=this.getWishID(this.aprt.apartment_Name,this.aprt.apartment_Location)apt_UUID
            this.wishID=this.getWishID(this.aprt.apartment_ID) 

          }, 500);
         console.log(this.wishID)
           // Assign the response to the wishlist array
         console.log('WishList:', this.wishList ,this.wishID,this.aprt.apartment_Name,this.aprt.apartment_Location);
         
       },
       (error) => {
         console.error('Error fetching wishlist:', error);
         // this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
       }
     );
 }

removeWish(wish_ID: string) {
 this.bookingService.removeFromWishlist(wish_ID).subscribe({
   next: (response) => {
     console.log('Item successfully removed:', response);
     this.allResponse.is_Wish=false;
   },
   error: (error) => {
     console.error('Error removing item:', error);
   }
 });
}

// getWishID(apartmentName: string, apartmentLocation: string): string | null {
 
//  const matchedWishlistItem = this.wishList.find(
//    (wishlistItem:any) =>
//      wishlistItem.apt_Name === apartmentName &&
//      wishlistItem.apt_Address === apartmentLocation
//  );
//  console.log(matchedWishlistItem.wish_ID )
 
//  return matchedWishlistItem ? matchedWishlistItem.wish_ID : null;
// }

getWishID(apartmentID:string): string | null {
 
  const matchedWishlistItem = this.wishList.find(
    (wishlistItem:any) =>
      wishlistItem.apt_UUID === apartmentID  
  );
  console.log(matchedWishlistItem )
  
  return matchedWishlistItem ? matchedWishlistItem.wish_ID : null;
 }

}
