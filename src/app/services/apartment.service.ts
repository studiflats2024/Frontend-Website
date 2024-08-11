// src/app/apartment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { environment } from '../../../src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  token: any = localStorage.getItem('tokenKey');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  getAllApartments(PageNumber: number, PageSize: number,Status:string): Observable<Apartment> {
    const url = `${environment.apiUrl}/ApartmentV2/GetListApartments`;
    const params = new HttpParams()
      .set('Page_No', PageNumber.toString())
      .set('Page_Size', PageSize.toString())
      .set('status', Status);

    return this.http.get<Apartment>(url, { params: params });
  }

  getApartDetail(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl + '/ApartmentV2/Apartment_InDetails?' + `Apartment_ID=${id}`}`,
      { headers: this.headers }
    );
  }


}
