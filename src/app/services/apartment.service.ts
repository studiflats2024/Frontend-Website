// src/app/apartment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiUrl = 'https://devapi.studiflats.com/api/ApartmentV2/GetListApartments';

  constructor(private http: HttpClient) {}

  getApartments(pageNo: number = 1, pageSize: number = 5): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiUrl}?Page_No=${pageNo}&Page_Size=${pageSize}`);
  }
}
