


// import { Component, OnInit } from '@angular/core';
// interface FAQ {
//   question: string;
//   answer: string;
// }
// @Component({
//   selector: 'app-faq',
//   templateUrl: './faq.component.html',
//   styleUrls: ['./faq.component.css']
// })
// export class FaqComponent implements OnInit {
//   faqs: FAQ[] = [
//     {
//       question: 'What is your cancellation policy?',
//       answer: 'Our cancellation policy is...'
//     },
//     {
//       question: 'How can I change my booking?',
//       answer: 'You can change your booking by...'
//     },

//   ];

//   constructor() { }

//   ngOnInit(): void {
//   }
// }

// src/app/components/faq/faq.component.ts
import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';

interface FAQ {
  faq_ID: string;
  faq_Quest: string;
  faq_Ans: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] = [];

  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    this.fetchFaqs();
  }

  fetchFaqs(): void {
    this.faqService.getFaqs().subscribe((data: FAQ[]) => {
      this.faqs = data;
    });
  }
}
