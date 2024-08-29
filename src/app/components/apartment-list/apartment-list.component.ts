
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Apartment_Maps } from '../../models/apartment_map';
import $ from 'jquery';

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



  constructor(private apartmentService: ApartmentService, private router: Router,private messageService: MessageService,private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // this.getAllApartment();

    this.checkWindowSize(window.innerWidth);


    this.applyFilter();
    this.onWindowScroll();
    this.get_Google_Maps();

    // this.fixPriceRangeApi()
    console.log(this.filterData)
  }
  ngAfterViewInit(): void {
    this.initMap();  // Initialize the map after the view has been initialized
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
        cursor: pointer;
        border-radius: 50%;
        right: 10px;">&#10095;</button>

      <div class="heart-icon" style="
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 5px;
        border-radius: 50%;
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

      marker.addListener('mouseover', () => {
        console.log('Marker hovered:', apartment.title);
        infoWindow.open(this.map, marker);
      });

      setTimeout(() => {
        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
      },  1000);
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
  }

  apply() {
    this.showPicker=false;
    this.showPickerguest=false;
    console.log(`Applied: Min Price: €${this.priceRange[0]}, Max Price: €${this.priceRange[1]}`);
  }



  apartmentList:any;
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
        this.totalofPages = response.totalPages;
        this.totalRecords = response.totalRecords;
        this.showPicker=false;
        this.showPickerguest=false;
        this.showPickerplace=false;
        this.filters=false;
        this.clear();
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
    this.filterData = {
      page_No: this.pageNumber,
      page_Size: this.pagesize,
      start_Price: this.priceRange[0],
      end_Price:  this.fixPriceRangeApi(),
      place_Type: this.selectedOptionsplace[0]||null,
      guest_No: this.guests||null,
      rooms_No: this.rooms||null,
      single_Beds_No: this.single||null,
      double_Bed_No: this.double||null,
      apartment_Size:  this.getNumberFromSelectedSize()||null
    };
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





}
