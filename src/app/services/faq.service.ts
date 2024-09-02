
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FAQ {
  faq_ID: string;
  faq_Quest: string;
  faq_Ans: string;
}


@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = 'https://api.studiflats.com/api/Basics/GetFAQ'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<FAQ[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type

    });
    return this.http.get<FAQ[]>(this.apiUrl, { headers });
  }
}
