import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-aprt-details',
  templateUrl: './aprt-details.component.html',
  styleUrls: ['./aprt-details.component.css']
})
export class AprtDetailsComponent {


  apartmentSize: string = '';
  apartmentType: string = '';
  apartmentFloor: number | null = null;
  numRooms: number | null = null;
  numBathrooms: number | null = null;
  numKitchens: number | null = null;
  minContractDuration: Date | null = null;
  maxContractDuration: Date | null = null;

  constructor() {

  }

  isSmallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;  // Check if the screen width is small (e.g., less than 768px)
  }

}
