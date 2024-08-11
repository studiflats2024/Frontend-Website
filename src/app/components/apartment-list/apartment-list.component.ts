
import { Component, OnInit, HostListener } from '@angular/core';
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

  guests: number = 1;
  priceRange: number[] = [0, 5000];
  showPickerguest:boolean=false;
  showPickerplace:boolean=false;
  showPicker: boolean = false;
  filters:boolean=false;
  spinner:boolean=true;
  subscriptions: Subscription[] = [];
  options = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'Studio', value: 'studio' },
    { label: 'Room', value: 'room' },
    { label: 'Shared place', value: 'shared_place' }
  ];
  selectedOptions: string[] = [];

  constructor(private apartmentService: ApartmentService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAllApartment();
    this.onWindowScroll();
  }



  togglePicker() {
    this.showPicker = !this.showPicker;
  }
  togglePickerplace() {
    this.showPickerplace = !this.showPickerplace;
  }
  togglePickerguest(){
    this.showPickerguest = !this.showPickerguest;
  }
  togglePickerfilter() {
    this.filters = !this.filters;
  }
  clear() {
    this.priceRange = [0, 5000];
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


  getAllApartment(): void {
    this.apartmentList = [];
    this.spinner = true;
    this.subscriptions.push(
      this.apartmentService.getAllApartments(this.pageNumber, this.pagesize, 'All').subscribe((res) => {

        this.allResponse = res;
        console.log(res)

        this.apartmentList = res.data;
        this.totalofPages = res.totalPages;
        this.totalRecords = res.totalRecords;

        // this.disablenext = this.totalofPages === this.pageNumber;
        // this.disableperv = this.pageNumber === 1;
        this.spinner = false;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load apartments' });
        this.spinner = false;
      })
    );
  }

  first: number = 1;
  rows: number = 8;
  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;


    let calcPageNumber = Math.floor(this.first / this.rows) + 1;

    this.pageNumber = calcPageNumber;
    this.getAllApartment();
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
