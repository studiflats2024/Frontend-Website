


import { Component, OnInit, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApartmentSearchService } from '../../../services/apartment-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  apartmentsSearch: any[] = [];
  // @Input() searchResults: any;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['searchResults'] && changes['searchResults'].currentValue) {
  //     console.log('Received search results in other component:', this.searchResults);

  //   }
  // }

  constructor(private apartmentSearchService: ApartmentSearchService, private apartmentService: ApartmentService, private router: Router,private messageService: MessageService) {}
  searchResults: any;
  ngOnInit(): void {
    this.getAllApartment();
    // this.apartmentSearchService.searchResults$.subscribe(results => {
    //   if (results) {
    //     this.searchResults = results;
    //     this.apartmentsSearch = results.data;
    //     console.log('Received search results in other component:', this.searchResults);
    //   }
    // });

  }

  handleSearchResults(results: any) {
    this.apartmentsSearch = results.data;
    console.log('Received search results in parent component:', this.apartmentsSearch);
    // يمكنك الآن استخدام البيانات كما ترغب في المكون الأب
  }

  searchVisible: boolean = false;

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    console.log(this.searchVisible );
  }

  apartmentList:any;
  pageNumber: number = 1;
  pagesize = 1000;
  allResponse:any;
  totalofPages = 0;
  totalRecords = 0;
  subscriptions: Subscription[] = [];

  getAllApartment(): void {
    this.apartmentList = [];

    this.subscriptions.push(
      this.apartmentService.getAllApartments(this.pageNumber, this.pagesize, 'All').subscribe((res) => {

        this.allResponse = res;
        console.log(res)

        this.apartmentList = res.data;
        this.totalofPages = res.totalPages;
        this.totalRecords = res.totalRecords;

        // this.disablenext = this.totalofPages === this.pageNumber;
        // this.disableperv = this.pageNumber === 1;
        // this.spinner = false;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load apartments' });
        // this.spinner = false;
      })
    );
  }


  // first: number = 1;
  // rows: number = 1;
  // tiggerPageChange(event: any) {
  //   this.first = event.first;
  //   this.rows = event.rows;


  //   let calcPageNumber = Math.floor(this.first / this.rows) + 1;

  //   this.pageNumber = calcPageNumber;
  //   this.getAllApartment();
  // }
  currentIndex = 0;
  visibleCount = 4;
  // next(): void {
  //   if (this.currentIndex < this.apartmentList.length - 1) {
  //     this.currentIndex++;
  //   }
  // }

  // prev(): void {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //   }
  // }

  getVisibleApartments() {
    return this.apartmentList.slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  next(): void {
    if (this.currentIndex <= this.apartmentList.length - this.visibleCount) {
      this.currentIndex++;
    }
    // else{
    //   this.currentIndex=this.apartmentList.length-1;
    // }
  //   const container = document.querySelector('.apartment-list');
  // container?.scrollBy({ left: 320, behavior: 'smooth' });
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  //   const container = document.querySelector('.apartment-list');
  // container?.scrollBy({ left: -320, behavior: 'smooth' });
  }

  getTransform(): string {
    const translateX = -(this.currentIndex * (300 + 20));
    return `translateX(${translateX}px)`;
  }

  getTransition(): string {
    return 'transform 0.5s ease-in-out';
  }

////////////////////////for search/////////////////
currentIndexs = 0;
visibleCounts = 4;
getVisibleApartmentsSearch() {
  return this.apartmentsSearch.slice(this.currentIndexs, this.currentIndexs + this.visibleCounts);
}

nextSearch(): void {
  if (this.currentIndexs <= this.apartmentsSearch.length - this.visibleCounts) {
    this.currentIndexs++;
  }
  // else{
  //   this.currentIndex=this.apartmentList.length-1;
  // }
//   const container = document.querySelector('.apartment-list');
// container?.scrollBy({ left: 320, behavior: 'smooth' });
}

prevSearch(): void {
  if (this.currentIndexs > 0) {
    this.currentIndexs--;
  }
//   const container = document.querySelector('.apartment-list');
// container?.scrollBy({ left: -320, behavior: 'smooth' });
}

getTransformSearch(): string {
  const translateX = -(this.currentIndexs * (300 + 20));
  return `translateX(${translateX}px)`;
}

getTransitionSearch(): string {
  return 'transform 0.5s ease-in-out';
}


}

