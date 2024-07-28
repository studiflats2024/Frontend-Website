
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  mapImage = 'https://via.placeholder.com/600x728';
  totalRecords: number = 0;
  guests: number = 1;
  priceRange: number[] = [0, 5000];
  showPickerguest:boolean=false;
  showPicker: boolean = false;
  options = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'Studio', value: 'studio' },
    { label: 'Room', value: 'room' },
    { label: 'Shared place', value: 'shared_place' }
  ];
  selectedOptions: string[] = [];

  constructor(private apartmentService: ApartmentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchApartments();
  }



  togglePicker() {
    this.showPicker = !this.showPicker;
  }
  togglePickerguest(){
    this.showPickerguest = !this.showPickerguest;
  }
  clear() {
    this.priceRange = [0, 5000];
  }

  apply() {
    this.showPicker=false;
    this.showPickerguest=false;
    console.log(`Applied: Min Price: €${this.priceRange[0]}, Max Price: €${this.priceRange[1]}`);
  }

  fetchApartments(): void {
    this.apartmentService.getApartments().subscribe((data: any) => {
      console.log(data);
      this.totalRecords = data.totalRecords;
      this.apartments = data.data.map((item: any) => ({
        apartment_ID: item.apartment_ID,
        apartment_Name: item.apartment_Name,
        apartment_Image: item.apartment_Image,
        apartment_No_Bedrooms: item.apartment_No_Bedrooms,
        apartment_Persons_No: item.apartment_Persons_No,
        apartment_Area_Square: item.apartment_Area_Square,
        apartment_Location: item.apartment_Location,
        apartment_Lat: item.apartment_Lat,
        apartment_Long: item.apartment_Long,
        apartment_Type: item.apartment_Type,
        apartment_RentDesc: item.apartment_RentDesc,
        is_Wish: item.is_Wish,
        apartment_Price: item.apartment_Price,
        amenities: ['Wifi', 'Kitchen', 'Free Parking'],
        reviews: 31,
        rating: 5.0,
      }));
    });
  }

  navigateToMap(): void {
    this.router.navigate(['/map']);
  }





}
