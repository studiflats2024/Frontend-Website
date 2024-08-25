import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface  ApartmentMapsService {

  latitude: number;
  longitude: number;
  imageUrl: string;
  title: string;
  price: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor() { }

  getApartments(): Observable<ApartmentMapsService[]> {
    const apartments: ApartmentMapsService[] = [
      { latitude: 52.5200, longitude: 13.4050, imageUrl: 'https://via.placeholder.com/150', title: 'Berlin Apartment', price: '€1500' },
      { latitude: 48.1351, longitude: 11.5820, imageUrl: 'https://via.placeholder.com/150', title: 'Munich Apartment', price: '€1800' },
      { latitude: 50.1109, longitude: 8.6821, imageUrl: 'https://via.placeholder.com/150', title: 'Frankfurt Apartment', price: '€1700' },
      { latitude: 53.5511, longitude: 9.9937, imageUrl: 'https://via.placeholder.com/150', title: 'Hamburg Apartment', price: '€1600' },
      { latitude: 51.1657, longitude: 10.4515, imageUrl: 'https://via.placeholder.com/150', title: 'Central Germany Apartment', price: '€1400' }
    ];
    return of(apartments);
  }
}
