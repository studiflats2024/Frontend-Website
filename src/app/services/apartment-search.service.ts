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
}
