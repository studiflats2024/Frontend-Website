// src/app/apartment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class BookingService {

  token = localStorage.getItem('token');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
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

  getBookingList(pageNo: number, pageSize: number, active: boolean, offered: boolean): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetBookingList`;
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    let headers=this.headers;
    let params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString())
      .set('Active', active.toString())
      .set('Offered', offered.toString());


    return this.http.get<any>(url, { params,headers});
  }

  getBookings(): Observable<any> {
    const url = `${environment.apiUrl}/Basics/GetBookings_WS`;
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    let headers=this.headers;

    return this.http.get<string>(url, { headers });
  }

  getBookingDetails(bookingID: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/Booking_Details_Mobile`;
    const params = new HttpParams().set('Booking_ID', bookingID);
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    let headers=this.headers;

    return this.http.get<any>(url, { params,headers});
  }

  cancelRequest(req_ID: string, guest_ID: string, reason: string, date: any): Observable<any> {
    const url = `${environment.apiUrl}/Requests/CancelRequest`;
    let params = new HttpParams()
      .set('Req_ID', req_ID)
      .set('Guest_ID', guest_ID)
      .set('Reason', reason)
      .set('Date', date.toString());
      this.token = localStorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });
      let headers=this.headers;
    // Make the PUT request with query parameters
    return this.http.put(url, {},  { params,headers});
  }

  updateRequestDates(req_ID: string, startDate: any, endDate: any): Observable<any> {
    const url = `${environment.apiUrl}/Requests/UpdateRequestDates`;
    let params = new HttpParams()
      .set('Req_ID', req_ID)
      .set('Start_Date', startDate.toString())
      .set('End_Date', endDate.toString());
      this.token = localStorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });
      let headers=this.headers;

    // Make the PUT request with query parameters
    return this.http.put(url, {},  { params,headers});
  }

  getWishList(pageNumber: number, pageSize: number, deviceToken: string): Observable<any> {
    const url = `${environment.apiUrl}/Basics/GetWishList`;
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('Device_Token', deviceToken);

      this.token = localStorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
      let headers=this.headers;

    // Make the GET request with query parameters
    return this.http.get(url, { params, headers });
  }

  addToWishlist(apt_ID: string, device_Token: string): Observable<any> {
    const url = `${environment.apiUrl}/Basics/AddWishList`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const body = {
      apt_ID: apt_ID,
      device_Token: device_Token
    };

    return this.http.post<any>(url, body, { headers: headers });
  }

  removeFromWishlist(wish_ID: string): Observable<any> {
    const url = `${environment.apiUrl}/Basics/RemoveWishList`;

    // Set Wish_ID as a query parameter
    const params = new HttpParams().set('Wish_ID', wish_ID);

    // Set headers (e.g., Authorization or Content-Type)
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(url, { params, headers });
  }


}
