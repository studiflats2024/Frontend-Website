

import { Component , EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import {  MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {


  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,  private messageService: MessageService) {
    this.contactForm = this.fb.group({
      sender_Name: ['', Validators.required],
      sender_Phone: ['', Validators.required],
      sender_Mail: ['', [Validators.required, Validators.email]],
      sender_Message: ['', Validators.required]
    });
  }
  // get senderName() {
  //   return this.contactForm.get('sender_Name')?.invalid ?? false;
  // }

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post<any>(`${environment.apiUrl + '/ApartmentV2/ContactUs'}` , this.contactForm.value).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
          console.log('Message sent successfully', response);

        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
          console.error('Error sending message', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
