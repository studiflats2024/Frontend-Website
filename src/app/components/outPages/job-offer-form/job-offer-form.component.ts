import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PhoneInputService } from '../../../services/phone-input.service'

@Component({
  selector: 'app-job-offer-form',
  templateUrl: './job-offer-form.component.html',
  styleUrls: ['./job-offer-form.component.css']
})
export class JobOfferFormComponent  implements   AfterViewInit {
     contactForm: FormGroup;
  loading = false;

  private engazUrl =
    'https://api.engazcrm.net/api/company3/save/JOBOFFER102690c97dd3f4d0?subdomain=extech';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService:MessageService,
      private phoneInputService: PhoneInputService
  ) {
    this.contactForm = this.fb.group({
      full_name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
   
    });
  }


    ngOnInit(): void {
    // this.contactForm = this.fb.group({
    //   full_name: ['', Validators.required],
    //   mobile: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
     
    // });
  }

  ngAfterViewInit(): void {
    // ✨ نهيّئ intl-tel-input على الـ input بعد ما يتعمل له render
    setTimeout(() => {
      const currentValue = this.contactForm.get('mobile')?.value || '';
      this.phoneInputService.initialize('#phone', currentValue);
    }, 0);
  }

onSubmit() {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  const v = this.contactForm.value;

      // ✅ ناخد الرقم اللي متخزن في الـ service (مع كود الدولة + تنظيف الأصفار)
    const phoneFromService = this.phoneInputService.phone;
    const mobileToSend = phoneFromService || v.mobile; // fallback لو لأي سبب الخدمة لسه مش جاهزة

  const body = new HttpParams()
    .set('full_name', v.full_name)
    .set('mobile', mobileToSend )
    .set('email', v.email || '');

  this.http.post<{ code: number; status: boolean; message: string }>(
    this.engazUrl,
    body.toString(),
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
  ).subscribe({
    next: (res) => {
      console.log('Sent to Engaz:', res);
      this.loading = false;
      this.contactForm.reset();
     this.phoneInputService.reset(); 
       
      const severity = res.status ? 'success' : 'warn';
      this.messageService.add({
        severity,
        summary: res.status ? 'Confirmed' : 'Warning',
        detail: res.message || 'Your data has been sent.'
      });
    },
    error: (err) => {
      console.error('Engaz error:', err);
      this.loading = false;

      
      let msg = 'An error occurred while sending your data.';
      try {
        const e = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
        if (e?.message) {
          msg = e.message;
        }
      } catch { }

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: msg
      });
    }
  });
}

}
