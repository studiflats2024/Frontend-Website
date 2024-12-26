import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentSearchService {
  private searchResultsSubject = new BehaviorSubject<any>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor() {}

  setSearchResults(results: any) {
    this.searchResultsSubject.next(results);
  }


  private requestDataSource = new BehaviorSubject<any>({
    checkIn: null,
    checkOut: null,
    guests: null,
  });

  // Observable for sharing data
  requestData$ = this.requestDataSource.asObservable();

  // Method to update data
  setRequestData(data: { checkIn: string; checkOut: string; guests: number }) {
    this.requestDataSource.next(data);
  }
}
