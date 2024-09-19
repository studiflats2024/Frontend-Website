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
  openModal(id:string){
    this.displayDetails='block'
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
        console.log('Invoice Details:', response);
        this.inv_Paid=this.invDetails.inv_Paid
      },
      error: (error) => {
        console.error('Error fetching invoice details:', error);
      }
    });
  }

}
