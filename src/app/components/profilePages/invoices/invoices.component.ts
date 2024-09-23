import { Component,OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';  // Adjust path based on your project structure
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {


  items!: any;
  constructor( private messageService: MessageService,private userService:UserService,private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My Invoices', routerLink: '/payments-invoices' }
    ];

    this.loadInvoices(1, 100, 'All');
  }

  displayDetails:string='none';
  onCloseModal(){
    this.displayDetails='none'
  }
  invID:any;
  openModal(id:string,invPaid:boolean){
    this.invID=id;
    this.inv_Paid=invPaid
    console.log(this.inv_Paid)
    this.fetchInvoiceDetails(id);
  }

  invoices:any;
  totalData:any
  loadInvoices(pageNumber: number, pageSize: number, status: string): void {
    this.userService.getInvoiceList(pageNumber, pageSize, status).subscribe(
      (response) => {
        console.log('Invoices:', response);
        this.invoices = response.data;
        this.totalData =response.totalRecords;
        console.log( this.totalData)
      },
      (error) => {
        console.error('Error fetching invoices:', error);
      }
    );
  }
  invDetails:any;
  inv_Paid:any;
  fetchInvoiceDetails(inv_ID: string): void {
    this.userService.getInvoiceDetails(inv_ID).subscribe({
      next: (response) => {
        this.invDetails=response;
        this.invCode=this.invDetails.invoice_No;
        console.log('Invoice Details:', response);

        this.displayDetails='block'
      },
      error: (error) => {
        console.error('Error fetching invoice details:', error);
      }
    });
  }
  invCode:any;
  payNow(invID:any): void {
    const invoiceCodes = [this.invCode]; // Replace with actual invoice codes
    const isCash = false;

    this.userService.getStripeCheckout(isCash, invoiceCodes).subscribe(
      (response) => {
        if (response) {

          // window.location.href = response;
          window.open(response, '_blank');
        } else {
          console.error('Invalid response from the server');
        }
      },
      (error) => {
        console.error('API Error:', error);
        alert('An error occurred while processing the payment. Please try again later.');
      }
    );
  }

}
