import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent {
  apartments = [
    {
      title: 'Togostr 17 Studio 1',
      address: 'Togostr , 17 , 13351 Berlin , Berlin - Wedding',
      beds: 5,
      persons: 4,
      size: 100,
      amenities: ['Wifi', 'Kitchen', 'Free Parking'],
      price: 2500,
      reviews: 31,
      rating: 5.0,
      image: 'https://via.placeholder.com/300x258'
    },
    {
      title: 'Togostr 17 Studio 1',
      address: 'Togostr , 17 , 13351 Berlin , Berlin - Wedding',
      beds: 5,
      persons: 4,
      size: 100,
      amenities: ['Wifi', 'Kitchen', 'Free Parking'],
      price: 2500,
      reviews: 31,
      rating: 5.0,
      image: 'https://via.placeholder.com/300x258'
    },
    {
      title: 'Togostr 17 Studio 1',
      address: 'Togostr , 17 , 13351 Berlin , Berlin - Wedding',
      beds: 5,
      persons: 4,
      size: 100,
      amenities: ['Wifi', 'Kitchen', 'Free Parking'],
      price: 2500,
      reviews: 31,
      rating: 5.0,
      image: 'https://via.placeholder.com/300x258'
    },
  ];

  mapImage = 'https://via.placeholder.com/600x728';
  constructor(private router: Router) {}

  navigateToMap() {
    this.router.navigate(['/map']);
  }

}
