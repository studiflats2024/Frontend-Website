
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { BookingService} from '../../services/booking.service';

import { Apartment } from '../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Apartment_Maps } from '../../models/apartment_map';
import $ from 'jquery';
import { ApartmentSearchService } from '../../services/apartment-search.service';
import { MessagingService } from '../../services/messaging.service';

declare var intlTelInput: any; // Declare intlTelInput for TypeScript
declare var intlTelInputUtils: any;



@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  apartments_maps:Apartment_Maps[]=[];
  lat: number = 51.1657; // Center of Germany
  lng: number = 10.4515;
  zoom: number = 12;
  map!: google.maps.Map;

  // guests: number = 0;
  // rooms: number = 0;
  // single: number = 0;
  // double: number = 0;
  // selectedSize: string = '';
  guests: any=null;
  rooms: any=null;
  single: any=null;
  double: any=null;
  selectedSize: any=null;

  priceRange:any = [0, 5000];
  // startprice= null;
  showPickerguest:boolean=false;
  showPickerplace:boolean=false;
  showPicker: boolean = false;
  filters:boolean=false;
  spinner:boolean=true;
  subscriptions: Subscription[] = [];
  options = [
    { label: 'Apartment', value: 'Apartment' },
    { label: 'Studio', value: 'Studio' },

  ];
  selectedOptions: string[] = [];
  selectedOptionsplace: any = [];





  selectSize(size: string) {
    this.selectedSize = size;
    console.log(this.single,this.double,this.rooms)
  }
  showPageLinks: boolean = true;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWindowSize(event.target.innerWidth);

  }
fixxxx:boolean=false;
  checkWindowSize(width: number): void {
    // if (width < 600) {
    //   this.showPageLinks = false;

    // } else {
    //   this.showPageLinks = true;
    // }
    if (width < 768) {

      this.showPageLinks = false;
      this.isVisible=true;
      this.fixxxx=true;
    } else {


      this.fixxxx=false;
      this.showPageLinks = true;
    }
  }



  constructor(private messagingService: MessagingService,private apartmentSearchService: ApartmentSearchService,private bookingService:BookingService,private apartmentService: ApartmentService, private router: Router,private messageService: MessageService,private cdr: ChangeDetectorRef) {
    this.cities = ['Berlin' ];
  }

  searchResults:any;
  apartmentsSearch:any

  ngOnInit(): void {
    // this.getAllApartment();
    // this.loadGoogleMapsAPI().then(() => {
    //   this.initMap();
    // });

    this.checkWindowSize(window.innerWidth);



    this.apartmentSearchService.searchResults$.subscribe(results => {
      if (results) {  // التحقق من وجود النتائج قبل القيام بأي عملية
        // this.searchResults = results;
        // this.apartmentsSearch = results.data;
        this.apartmentList = results.data;
        console.log(this.apartmentList)
        this.totalofPages =results.totalPages;
        this.totalRecords = results.totalRecords;
        this.showPicker=false;
        this.showPickerguest=false;
        this.showPickerplace=false;
        this.filters=false;
        this.clear();
        console.log('Received search results in other component:', this.searchResults);
      }else{
        this.applyFilter();
      }
    });



    this.onWindowScroll();
    this.get_Google_Maps();

    // this.fixPriceRangeApi()
    console.log(this.filterData)


  }




  // loadGoogleMapsAPI(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     if (typeof google === 'undefined') {
  //       const script = document.createElement('script');
  //       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBHTtV1r89Ln_w2FaVB3WNWCVPe1yAQONo&callback=initMap`;
  //       script.async = true;
  //       script.defer = true;
  //       script.onload = () => resolve();
  //       script.onerror = (error) => reject(error);
  //       document.head.appendChild(script);
  //     } else {
  //       resolve();
  //     }
  //   });
  // }
  phoneNumber!: string;
  ngAfterViewInit(): void {
    this.initMap();
    // const phoneInput = document.querySelector('#waitPhone');

    // const iti = (window as any).intlTelInput(phoneInput, {
    //   initialCountry: 'de',
    //   separateDialCode: true,
    //   preferredCountries: ['de', 'us', 'gb'],
    //   utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
    // });

    // phoneInput!.addEventListener('countrychange', () => {
    //   this.phoneNumber = iti.getNumber();
    // });


  }
  initMap(): void {
    // Center map on Germany
    const berlinCoordinates = { lat: 52.5200, lng: 13.4050 };
    this.map = new google.maps.Map(document.getElementById("googlemap") as HTMLElement, {
      center:berlinCoordinates,
      zoom: 10
    });
  }

  get_Google_Maps() {
    this.apartmentService.apartment_maps().subscribe(
      response => {
        this.apartments_maps = response;

        this.addMarkers();
        console.log("Eslam Code", this.apartments_maps);  // Logs the response data
      },
      error => {
        console.error("Error fetching apartment maps data:", error);  // Handle errors if any
      }
    );
  }


  addMarkers(): void {
    if (!this.map) {
      console.error('Map is not initialized.');
      return;
    }

    if (!this.apartments_maps || !this.apartments_maps.length) {
      console.error('No apartment data available.');
      return;
    }

    this.apartments_maps.forEach(apartment => {
      if (!apartment.latitude || !apartment.longitude) {
        console.error('Invalid coordinates for apartment:', apartment);
        return;
      }

      const marker = new google.maps.Marker({
        position: { lat: apartment.latitude, lng: apartment.longitude },
        map: this.map,
        title: apartment.title
      });

      if (!marker) {
        console.error('Failed to create marker for apartment:', apartment);
        return;
      }

      // console.log('Marker created:', marker);

    //   const infoWindowContent = `
    //   <style>
    //     .item-card-map {
    //       display: flex;
    //       flex-direction: column;
    //       align-items: center;
    //       width: 100%;
    //       max-width: 320px;
    //       border: 1px solid #ddd;
    //       border-radius: 10px;
    //       overflow: hidden;
    //       background-color: #fff;
    //       box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    //     }

    //     .item-card-map img {
    //       width: 100%;
    //       height: auto;
    //       max-height: 180px;
    //       object-fit: cover;
    //     }

    //     .item-card-map h3 {
    //       margin: 15px 0 5px;
    //       font-size: 1.2em;
    //       color: #333;
    //       text-align: center;
    //     }

    //     .item-card-map p {
    //       margin: 0 15px 15px;
    //       font-size: 0.9em;
    //       color: #777;
    //       text-align: center;
    //     }
    //   </style>
    //   <div class="item-card-map">
    //     <h3>${apartment.title}</h3>
    //     <img src="${apartment.imageUrl}" alt="${apartment.title}">
    //     <p>Price: ${apartment.price}</p>
    //   </div>
    // `;

    const infoWindowContent = `
  <div class="item-card-map" style="
    width: 320px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-family: Arial, sans-serif;">

    <div class="image-slider" style="
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;">

      <button class="prev" style="
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        padding: 8px 10px;
        cursor: pointer;
        border-radius: 50%;
        left: 10px;">&#10094;</button>

      <img src="${apartment.imageUrl}" alt="${apartment.title}" class="slider-image" style="
        width: 100%;
        height: 100%;
        object-fit: cover;">

      <button class="next" style="
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        padding: 8px 10px;
        cursor: pointer;
        border-radius: 50%;
        right: 10px;">&#10095;</button>

      <div id="heart-${apartment.title}" class="heart-icon" style="
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 5px;
        padding: 3px 5px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;">&#9829;</div>
    </div>

    <div class="card-content" style="
      padding: 15px;">


      <h2 style="
        margin-bottom: 7px;
        font-weight:bold;
        font-size: 1.6em;
        color: #333;">${apartment.title} </h2>

      <h2 style="
        margin: 0;
        font-size: 1.4em;
        color: #333;">&euro;${apartment.price}/Month <span style="
          font-size: 0.8em;
          color: #777;">(Bills included)</span></h2>

    </div>


  </div>

`;


      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener('click', () => {
        console.log('Marker hovered:', apartment.title);
        infoWindow.open(this.map, marker);
      });

      // Add event listener for the heart icon after the info window is opened
google.maps.event.addListener(infoWindow, 'domready', () => {
  const heartElement = document.getElementById(`heart-${apartment.title}`);
  if (heartElement) {
    // Toggle favorite manually
    heartElement.addEventListener('click', () => {
      // Toggle the favorite status (you may need to update this to match your logic)
      const isFavorite = this.favoriteApartments[apartment.title];
      this.favoriteApartments[apartment.title] = !isFavorite;

      // Update the heart color
      heartElement.style.color = !isFavorite ? 'red' : 'white';
    });
  }
});

      // setTimeout(() => {
      //   marker.addListener('mouseout', () => {
      //     infoWindow.close();
      //   });
      // },  1000);
    });
  }

  // addMarkers(): void {
  //   this.apartments_maps.forEach(apartment => {
  //     const marker = new google.maps.Marker({
  //       position: { lat: apartment.latitude, lng: apartment.longitude },
  //       map: this.map,
  //       title: apartment.title
  //     });
  //     console.log(marker)

  //     const infoWindowContent = `
  //       <div class="item-card-map">
  //         <h3>${apartment.title}</h3>
  //         <img src="${apartment.imageUrl}" alt="${apartment.title}">
  //         <p>Price: ${apartment.price}</p>
  //       </div>
  //     `;
  //     const infoWindow = new google.maps.InfoWindow({
  //       content: infoWindowContent
  //     });

  //     marker.addListener('mouseover', () => {
  //       infoWindow.open(this.map, marker);
  //     });

  //     marker.addListener('mouseout', () => {
  //       infoWindow.close();
  //     });
  //   });
  // }

  togglePicker() {
    this.showPicker = !this.showPicker;

    this.showPickerguest=false;
    this.showPickerplace=false;
    this.filters=false;
  }
  togglePickerplace() {
    this.showPickerplace = !this.showPickerplace;
    this.showPicker=false;
    this.showPickerguest=false;

    this.filters=false;
  }
  togglePickerguest(){
    this.showPickerguest = !this.showPickerguest;
    this.showPicker=false;

    this.showPickerplace=false;
    this.filters=false;
  }
  togglePickerfilter() {
    this.filters = !this.filters;
    this.showPicker=false;
    this.showPickerguest=false;
    this.showPickerplace=false;

  }
  clear() {

    this.priceRange[0]=0;
    this.priceRange[1]=5000;
    this.selectedOptionsplace=[];
    this.guests=null;
    this.rooms=null;
    this.single=null;
    this.double=null;
    this.selectedSize= null;

    this.filterData = {
      page_No: this.pageNumber,
      page_Size: this.pagesize,
      start_Price: this.priceRange[0],
      end_Price: this.priceRange[1] ,
      place_Type:  null,
      guest_No:  null,
      rooms_No:  null,
      single_Beds_No:  null,
      double_Bed_No:  null,
      apartment_Size:  null
    };
    //this.fixPriceRangeApi()

    this.cdr.detectChanges();
    // this.applyFilter()

  }

  apply() {
    this.showPicker=false;
    this.showPickerguest=false;
    console.log(`Applied: Min Price: €${this.priceRange[0]}, Max Price: €${this.priceRange[1]}`);
  }
  clearPrice(){
    // this.filterData.start_Price=null
    // this.filterData.end_Price=null
    this.priceRange[1]=5000
    this.priceRange[0]=0
    this.applyFilter()
  }
  clearGuests(){
    // this.filterData.guest_No=null
    this.guests=null
     this.applyFilter()
  }
  clearPlaceType(){
    // this.filterData.place_Type=null
    this.selectedOptionsplace=[]
    this.applyFilter()
  }
  clearFilters(){
  //  this.filterData.rooms_No=null
  //  this.filterData.single_Beds_No=null
  //  this.filterData.double_Bed_No=null
  //  this.filterData.apartment_Size=null

   this.selectedSize=null
   this.rooms=null
   this.single=null
   this.double=null

   this.applyFilter()

  }

  clearAll(){
    this.clear()
    this.applyFilter();
  }




  apartmentList:any=[];
  pageNumber: number = 1;
  pagesize = 8;
  allResponse:any;
  totalofPages = 0;
  totalRecords = 0;


  // getNumberFromSelectedSize(): number {
  //   const numberString = this.selectedSize.replace(/\D/g, '')||null;
  //   return parseInt(numberString, 10);
  // }

  getNumberFromSelectedSize(): number|null  {
    if (!this.selectedSize) {
        return null;
    }
    const numberString = this.selectedSize.replace(/\D/g, ''); // Only call replace if selectedSize is valid
    return parseInt(numberString, 10);
}


 fixPriceRangeApi(){
  if(this.priceRange[1]===5000){
  return null;
  }else{
    this.priceRange[1]=this.priceRange[1];
    console.log(this.priceRange[1]);
  return this.priceRange[1];
  }

 }

//  fixPriceRangeApiStart(){
//   if(this.priceRange[0]===5000){
//   return null;
//   }else{
//     this.priceRange[1]=this.priceRange[1];
//     console.log(this.priceRange[1]);
//   return this.priceRange[1];
//   }

 //}

  filterData = {
    page_No: this.pageNumber,
    page_Size: this.pagesize,
    start_Price: this.priceRange[0],
    end_Price: this.fixPriceRangeApi(),
    place_Type: this.selectedOptionsplace||null,
    guest_No: this.guests||null,
    rooms_No: this.rooms||null,
    single_Beds_No: this.single||null,
    double_Bed_No: this.double||null,
    apartment_Size:  this.getNumberFromSelectedSize()||null
  };


  applyFilter() {
    this.apartmentList = [];
    this.filterData = {
      page_No: this.pageNumber,
      page_Size: this.pagesize,
      start_Price:this.priceRange[0],
      end_Price:  this.fixPriceRangeApi(),
      place_Type: this.selectedOptionsplace||null,
      guest_No: this.guests||null,
      rooms_No: this.rooms||null,
      single_Beds_No: this.single||null,
      double_Bed_No: this.double||null,
      apartment_Size:  this.getNumberFromSelectedSize()
    };
    console.log(this.filterData )
    this.apartmentService.filterApartments(this.filterData).subscribe(
      response => {
        console.log('Filter results:', response);
        // يمكنك التعامل مع الاستجابة هنا، مثل عرض النتائج في واجهة المستخدم
        this.allResponse = response;
        console.log(response)

        this.apartmentList = response.data;
        console.log(this.apartmentList)

        this.totalofPages = response.totalPages;
        this.totalRecords = response.totalRecords;
        this.showPicker=false;
        this.showPickerguest=false;
        this.showPickerplace=false;
        this.filters=false;
        // this.clear();
      },
      error => {
        console.error('Error filtering apartments:', error);
        // يمكنك التعامل مع الخطأ هنا، مثل عرض رسالة خطأ للمستخدم
      }
    );
  }



  // getAllApartment(): void {
  //
  //   this.spinner = true;
  //   this.subscriptions.push(
  //     this.apartmentService.getAllApartments(this.pageNumber, this.pagesize, 'All').subscribe((res) => {

  //       this.allResponse = res;
  //       console.log(res)

  //       this.apartmentList = res.data;
  //       this.totalofPages = res.totalPages;
  //       this.totalRecords = res.totalRecords;


  //       this.spinner = false;
  //     }, error => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load apartments' });
  //       this.spinner = false;
  //     })
  //   );
  // }

  first: number = 1;
  rows: number = 8;
  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;


    let calcPageNumber = Math.floor(this.first / this.rows) + 1;

    this.pageNumber = calcPageNumber;
    // this.filterData = {
    //   page_No: this.pageNumber,
    //   page_Size: this.pagesize,
    //   start_Price: this.priceRange[0],
    //   end_Price:  this.fixPriceRangeApi(),
    //   place_Type: this.selectedOptionsplace[0]||null,
    //   guest_No: this.guests||null,
    //   rooms_No: this.rooms||null,
    //   single_Beds_No: this.single||null,
    //   double_Bed_No: this.double||null,
    //   apartment_Size:  this.getNumberFromSelectedSize()||null
    // };
    // this.getAllApartment();
    this.applyFilter()
  }

  navigateToMap(): void {
    this.router.navigate(['/map']);
  }

isVisible:boolean=true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const section1 = document.querySelector('.d-grid.out.section-to-watch') as HTMLElement;
    const section2 = document.querySelector('.custom-footer.section-to-watch') as HTMLElement;
    const mapElement = document.getElementById('googlemap');

    if (section1 && section2 && mapElement) {
      const rect1 = section1.getBoundingClientRect();
      const rect2 = section2.getBoundingClientRect();
      const windowHeight = window.innerHeight;


      const section1Visible = rect1.top < windowHeight && rect1.bottom > 0;
      const section2Visible = rect2.top < windowHeight && rect2.bottom > 0;

      if ((section1Visible || section2Visible)&&!this.fixxxx) {
        this.deactivateMap();
      } else {
        this.activateMap();
      }
    }
  }
  activateMap() {
    this.isVisible=true;
    const mapElement = document.getElementById('googlemap'); // استبدل 'map-id' بالمعرف الفعلي للعنصر
    if (mapElement) {
      // هنا تكتب الكود البسيط لتشغيل الخريطة
      mapElement.style.display = 'block'; // مثال بسيط: إظهار الخريطة
      console.log('Map activated!');
    }
  }

  deactivateMap() {
    const mapElement = document.getElementById('googlemap'); // استبدل 'googlemap' بالمعرف الفعلي للعنصر
    if (mapElement) {
      mapElement.style.display = 'none'; // إخفاء الخريطة عند الحاجة
      console.log('Map deactivated!');
    }
  }







  // private checkScreenSize(): void {
  //   if (window.innerWidth < 768) {
  //     this.removeScrollListener();
  //   } else {
  //     this.addScrollListener();
  //   }
  // }

  // private addScrollListener(): void {
  //   window.addEventListener('scroll', this.scrollListener);
  // }

  // private removeScrollListener(): void {
  //   window.removeEventListener('scroll', this.scrollListener);
  // }

  // ngOnDestroy(): void {
  //   this.removeScrollListener();
  //   window.removeEventListener('resize', this.checkScreenSize.bind(this));
  // }


  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    // Clear search results
    this.apartmentSearchService.setSearchResults(null);
    this.apartmentList = [];
  }



  visible:boolean=false;
  formattedPhone:string=''
  formattedPhoneGuest:string='';
  showDialog(){


    setTimeout(() => {


      const phoneInput = document.querySelector('#waitPhone');

      if (phoneInput && !phoneInput.getAttribute('data-intl-tel-initialized')) {

      const iti = (window as any).intlTelInput(phoneInput, {
        initialCountry: 'de',
        separateDialCode: true,  // Separate dial code
        preferredCountries: ['de', 'us', 'gb'],
        // utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
        searchCountry:true,
      });
      phoneInput.setAttribute('data-intl-tel-initialized', 'true');
      phoneInput!.addEventListener('countrychange', () => {
        this.phoneNumber = iti.getNumber(); // Update the phone number with country code
      });
      console.log(this.visible)
      // this.formattedPhone = this.phoneNumber.startsWith('+')
      // ? this.phoneNumber.substring(1)
      // : this.phoneNumber;

      phoneInput!.addEventListener('blur', () => {
        // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        let fullPhoneNumber = iti.getNumber();

        if (fullPhoneNumber.startsWith('+')) {
          fullPhoneNumber = fullPhoneNumber.substring(1); // Remove the '+' sign
        }
        this.phoneNumber= fullPhoneNumber;
         console.log('MainPhone',fullPhoneNumber)
      });



      // console.log('formattedPhone',this.formattedPhone)
    } else {
      console.log('IntlTelInput already initialized or phone input not found.');
    }

    }, 0);
    this.visible=true;
  }

userName:string='';
emaill=''
  onSubmit(form: any): void {
    if (form.valid) {
      // Remove the "+" sign from the phone number
      const formattedPhone = this.phoneNumber.startsWith('+')
        ? this.phoneNumber.substring(1)
        : this.phoneNumber;

      console.log('Form Submitted', {
        username: this.userName,
        phone: formattedPhone,

      });
    } else {
      console.log('Form is invalid');
    }
  }

/////////////////////////////////////////////waitingList/////////////////////////////////////
  repeatCount: number = 1; // Default number of fields
  users: Array<{ guest_ID: string; guest_Name: string;  guest_Email:string;guest_Phone: string }> = []; // Array to store user data

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  // Method to initialize the user array based on repeatCount
  initializeUsers() {
    this.users = [];
    for (let i = 0; i < this.repeatCount; i++) {
      this.users.push({ guest_ID: this.generateUUID(),guest_Name: '', guest_Email: '', guest_Phone:'' });
    }
    this.initializeIntlTelInput(); // Initialize phone input fields
  }

  // Method to handle repeat count change
  onRepeatCountChange() {
    console.log('hellooooooo');
    this.initializeUsers(); // Update user array and initialize inputs
  }

  // Initialize intlTelInput for dynamically added phone inputs
  initializeIntlTelInput() {
    setTimeout(() => {
      const phoneInputs = document.querySelectorAll('.iti-phone-input');
      phoneInputs.forEach((input, index) => {
        if (input) {
          const iti = intlTelInput(input, {
            initialCountry: 'de', // Default to Germany
            preferredCountries: ['de', 'us', 'gb'], // Preferred countries list
            separateDialCode: true, // Show country code separate from number
            // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
            searchCountry:true,
          });

          // Add event listener to handle phone number on blur
          input.addEventListener('blur', () => {
            // let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            let fullPhoneNumber = iti.getNumber();

            if (fullPhoneNumber.startsWith('+')) {
              fullPhoneNumber = fullPhoneNumber.substring(1); // Remove the '+' sign
            }

            // Update the phone value in the user array
            this.users[index].guest_Phone = fullPhoneNumber;
          });
        }
      });
    }, 0); // Ensures the DOM is fully ready
  }

  backstep(){
    this.visible=false;
  }
  startDate:any;
  endDate:any;
  cities!: string[]; // Array of city names
  selectedCity!: string;
  waitingData :any;
  rentFee:any;
  tellMore:any;
  displayModalsuccess:string='none';
  submitForm() {
    console.log('Form Data:', this.users);

    const mainGuest = {
      guest_ID: this.generateUUID(),
      guest_Name: this.userName,
      guest_Email: this.emaill,
      guest_Phone: this.phoneNumber,
    };
    this.users.unshift(mainGuest);

    this.waitingData = {
      start_Date: this.startDate,
      end_Date: this.endDate,
      no_Guests: this.repeatCount,
      rent_Fees: this.rentFee,
      city: [this.selectedCity],
      tell_More: this.tellMore,
      guests: this.users,
    };
    this.apartmentService.addWaitingWS(this.waitingData).subscribe(response => {
      console.log('API Response:', response);

      this. displayModalsuccess='block';
      this.visible=false;
      // Handle success
    }, error => {
      console.error('API Error:', error);
      // Handle error
    });
  }

  onCloseSuccessModal(){
    this. displayModalsuccess='none';

  }

  favoriteApartments: { [key: string]: boolean } = {};
  toggleFavorite(apt_ID: string) {
    // Toggle favorite status
    // this.favoriteApartments[apt_ID] = !this.favoriteApartments[apt_ID];
    this.favoriteApartments[apt_ID] = true;


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
      },
      (error) => {
        console.error('API call error:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
      }
    );
  }


}
