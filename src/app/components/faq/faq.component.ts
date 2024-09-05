
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() faqLimit: number = 0;
  faqs: FAQ[] = [];
  @Input() showViewAllButton: boolean = false;

  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    this.fetchFaqs();
  }

  // fetchFaqs(): void {
  //   this.faqService.getFaqs().subscribe((data: FAQ[]) => {
  //     this.faqs = data;
  //   });
  // }
  fetchFaqs(): void {
    this.faqService.getFaqs().subscribe((data: FAQ[]) => {
      if (this.faqLimit > 0) {
        this.faqs = data.slice(0, this.faqLimit);
      } else {
        this.faqs = data;
      }
    });
  }

  @Input() titleAlignment: string = 'center';
  @Input() titleMargin: string = '40px';

  getTitleStyle() {
    return {
      'text-align': this.titleAlignment ,
      'margin-left': this.titleMargin
    };
  }
  @Input() backgroundColor: string = '#EBEBEB';
  @Input() customClass: string = '';
  @Input() fixheight: string = '100px';
}
