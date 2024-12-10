


import { Component,  AfterViewChecked,OnInit, HostListener, Input, OnChanges, SimpleChanges , AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit  {
  private scrollContainer!: HTMLElement;

  apartmentsSearch: any[] = [];
  // @Input() searchResults: any;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['searchResults'] && changes['searchResults'].currentValue) {
  //     console.log('Received search results in other component:', this.searchResults);

  //   }
  // }
/////////////////////////////////////////////////////////////////////pretty scrollable////////////////////////////////////////
  ngAfterViewInit(): void {
     
    this.scrollContainer = this.elementRef.nativeElement.querySelector('.apartment-list');

    
    this.renderer.listen(this.scrollContainer, 'mousemove', (event: MouseEvent) => {
      const containerWidth = this.scrollContainer.offsetWidth;
      
      
 
      const mouseX = event.clientX;

    
      if (mouseX < containerWidth * 0.1) {
        this.scrollContainer.scrollBy({ left: -10, behavior: 'smooth' });
      
      }

      
      if (mouseX > containerWidth * 0.9) {
        this.scrollContainer.scrollBy({ left: 10, behavior: 'smooth' });
       

      }
    });

     
  }
  // ngAfterViewInit(): void {
  //   this.scrollContainer = this.elementRef.nativeElement.querySelector('.apartment-list');
  
  //   const cardWidth = 440;  
  //   const gap = 20;  
  
  //   console.log('Scroll Width:', this.scrollContainer.scrollWidth);
  //   console.log('Offset Width:', this.scrollContainer.offsetWidth);
  //   console.log('Number of Cards:', this.scrollContainer.querySelectorAll('.apartment-card').length);
  
  //   this.renderer.listen(this.scrollContainer, 'mousemove', (event: MouseEvent) => {
  //     const containerWidth = this.scrollContainer.offsetWidth;
  //     const scrollWidth = this.scrollContainer.scrollWidth;
  //     const scrollLeft = this.scrollContainer.scrollLeft;
  //     const mouseX = event.clientX;
  
 
  //     if (mouseX < containerWidth * 0.1 && scrollLeft > 0) {
  //       this.scrollContainer.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  //     }
  
 
  //     if (mouseX > containerWidth * 0.9 && scrollLeft < scrollWidth - containerWidth) {
  //       this.scrollContainer.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  //     }
  //   });
  // }
  
  

 
  
  
  
/////////////////////////////////////////////////////////////////////end pretty scrollable////////////////////////////////////////


  constructor(private elementRef: ElementRef, private renderer: Renderer2,private apartmentSearchService: ApartmentSearchService, private apartmentService: ApartmentService, private router: Router,private messageService: MessageService) {}
  searchResults: any;
  ngOnInit(): void {
    this.getAllApartment();
    this.getVisibleApartments()
    // this.apartmentSearchService.searchResults$.subscribe(results => {
    //   if (results) {
    //     this.searchResults = results;
    //     this.apartmentsSearch = results.data;
    //     console.log('Received search results in other component:', this.searchResults);
    //   }
    // });

  }

  userComments = [
    // {
    //     userImage: 'img1user.png',
    //     userName: 'Floyd Miles',
    //     userComment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    //     rating: '4.8'
    // },
    {
        userImage: 'img2user.png',
        userName: 'Jane Smith',
        userComment: 'I booked a bed in a shared apartment, and it was a fantastic experience. The host was very accommodating, and the location was perfect for exploring the city. The other guests were friendly, and it felt like a home away from home.',
        rating: '4.7'
    },
    {
        userImage: 'img3user.png',
        userName: 'Mike Johnson',
        userComment: 'I stayed in a private room in an apartment and was very impressed with the cleanliness and comfort. The bed was large and comfortable, and the apartment had a very welcoming atmosphere. A great value for the price!',
        rating: '4.9'
    },
    {
      userImage: 'img1user.png',
      userName: 'Floyd Miles',
      userComment: 'The apartment was spotless and exactly as described. The bed was incredibly comfortable, and the view from the balcony was breathtaking. Highly recommend this place for anyone looking for a peaceful stay.',
      rating: '4.8'
  },
  {
      userImage: 'img2user.png',
      userName: 'Jane Smith',
      userComment: 'I booked a bed in a shared apartment, and it was a fantastic experience. The host was very accommodating, and the location was perfect for exploring the city. The other guests were friendly, and it felt like a home away from home.',
      rating: '4.7'
  },
  {
      userImage: 'img3user.png',
      userName: 'Mike Johnson',
      userComment: 'I stayed in a private room in an apartment and was very impressed with the cleanliness and comfort. The bed was large and comfortable, and the apartment had a very welcoming atmosphere. A great value for the price!',
      rating: '4.9'
  }
];


responsiveOptions = [
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }
];



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
  visibleCount = 5;
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
    // if (this.currentIndex <= this.apartmentList.length - this.visibleCount) {
    //   this.currentIndex++;
    // }
    if (this.currentIndex < this.visibleCount) {
      this.currentIndex++;
    
    }
 
  }
  nextt(): void {
    const totalCards = this.apartmentList.length; // Replace with your actual data array
    const containerWidth = this.scrollContainer.offsetWidth;
    const cardWidth = 440; // Replace with your actual card width
    const visibleCount = Math.floor(containerWidth / cardWidth); // Calculate visible cards
    const maxIndex = totalCards - visibleCount; // Maximum index to allow scrolling
  
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
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

