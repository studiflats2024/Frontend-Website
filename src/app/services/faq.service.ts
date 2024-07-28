
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'https://devapi.studiflats.com/api/Basics/GetFAQ'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(this.apiUrl);
  }
}
