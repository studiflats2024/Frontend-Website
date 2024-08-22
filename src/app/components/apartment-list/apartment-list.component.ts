
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  mapImage = 'https://via.placeholder.com/600x728';
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 8;

  guests: number = 0;
  rooms: number = 0;
  single: number = 0;
  double: number = 0;
  priceRange: number[] = [0, 5000];
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
  selectedOptionsplace: string[] = [];
  selectedSize: string = '';

  selectSize(size: string) {
    this.selectedSize = size;
    console.log(this.single,this.double,this.rooms)
  }

  constructor(private apartmentService: ApartmentService, private router: Router,private messageService: MessageService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.getAllApartment();
    this.applyFilter();
    this.onWindowScroll();
    this.fixPriceRangeApi()
    console.log(this.filterData)
  }



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
    this.guests=0;
    this.rooms=0;
    this.single=0;
    this.double=0;
    this.selectedSize= '';

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


  getNumberFromSelectedSize(): number {
    const numberString = this.selectedSize.replace(/\D/g, '');
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

  filterData = {
    page_No: this.pageNumber,
    page_Size: this.pagesize,
    start_Price: this.priceRange[0]||null,
    end_Price: this.fixPriceRangeApi(),
    place_Type: this.selectedOptionsplace[0]||null,
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
      start_Price: this.priceRange[0]||null,
      end_Price: this.fixPriceRangeApi(),
      place_Type: this.selectedOptionsplace[0]||null,
      guest_No: this.guests||null,
      rooms_No: this.rooms||null,
      single_Beds_No: this.single||null,
      double_Bed_No: this.double||null,
      apartment_Size:  this.getNumberFromSelectedSize()||null
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
      start_Price: this.priceRange[0]||null,
      end_Price: this.fixPriceRangeApi(),
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
    const sections = document.getElementsByClassName('section-to-watch');
    const windowHeight = window.innerHeight;

    let isAnySectionVisible = false;

    for (let i = 0; i < sections.length; i++) {
      const rect = (sections[i] as HTMLElement).getBoundingClientRect();

      if ( rect.top < windowHeight/2 && rect.bottom > windowHeight/2) {
        isAnySectionVisible = true;
        break;
      }
    }

    const section1 = document.querySelector('.d-grid.out.section-to-watch') as HTMLElement;
    const section2 = document.querySelector('.custom-footer.section-to-watch') as HTMLElement;

    const section1Visible = section1 ? (section1.getBoundingClientRect().top < windowHeight && section1.getBoundingClientRect().bottom > 0) : false;
    const section2Visible = section2 ? (section2.getBoundingClientRect().top < windowHeight && section2.getBoundingClientRect().bottom > 0) : false;

    this.isVisible = !(section1Visible && section2Visible);

    // console.log('Section1 Visible:', section1Visible);
    // console.log('Section2 Visible:', section2Visible);
    // console.log('isVisible:', this.isVisible);
  }







}
