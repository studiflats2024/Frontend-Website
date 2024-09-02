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
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Specify the content type

      });

    // return this.http.get<Apartment>(url, { params: params });
    return this.http.get<Apartment>(url,  { params, headers });

  }

  getApartDetail(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      `${environment.apiUrl + '/ApartmentV2/Apartment_InDetails?' + `Apartment_ID=${id}`}`,{ headers }
    );
  }

  sendBookingData(bookingData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post( `${environment.apiUrl + '/ApartmentV2/Apartment_New_Booking'}`, bookingData, { headers });
  }

  searchApartments(pageNo: number, pageSize: number, city: string, checkIn: string, checkOut: string, guestNo: number): Observable<any> {
    let params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString())
      .set('City', city)
      .set('Check_In', checkIn)
      .set('Check_Out', checkOut)
      .set('Guest_No', guestNo.toString());

        const body = {
    Page_No: pageNo,
    Page_Size: pageSize,
    City: city,
    Check_In: checkIn,
    Check_Out: checkOut,
    Guest_No: guestNo
  };
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Specify the content type

  });

    return this.http.post<any>( `${environment.apiUrl + '/ApartmentV2/Search_Website'}`, {}, { params, headers });
  }


  filterApartments(filterData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${environment.apiUrl + '/ApartmentV2/Filters_Website'}`, filterData, { headers });
  }

  apartment_maps(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${environment.apiUrl + '/ApartmentV2/Get_Google_Maps_List_Apartments'}`, { headers });
  }
}
