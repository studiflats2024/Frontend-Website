






import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit {
  apartments: Apartment[] = [];
  loginMethod: string = 'email';


  constructor(private apartmentService: ApartmentService, private router: Router) {}

  center: google.maps.LatLngLiteral = { lat: 51.678418, lng: 7.809007 };
  zoom = 8;

  faqs = [
    {
      faq_Quest: 'How can I make a booking?',
      faq_Ans: 'You can make a booking by visiting our website and selecting the desired service. Follow the instructions to complete your booking.'
    },
    {
      faq_Quest: 'What payment methods are accepted?',
      faq_Ans: 'We accept various payment methods including Visa, MasterCard, American Express, and PayPal.'
    },
    {
      faq_Quest: 'Can I cancel or modify my booking?',
      faq_Ans: 'Yes, you can cancel or modify your booking by logging into your account and navigating to the bookings section.'
    }
  ];
  items:any=[];
  activeIndex: number = 0;


  ngOnInit(): void {
    this.items = [
      { label: 'select your need' },
      { label: 'enter guests details' },
      { label: 'booking summary' },

    ];
  }

  onStepChange(event: any) {
    this.activeIndex = event.index;
  }
  showBooking:boolean=true;

  onsubmitLogin(){
  this.showBooking=true;
  }








}

