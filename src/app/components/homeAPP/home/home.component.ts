


import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private apartmentService: ApartmentService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAllApartment();

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




}

