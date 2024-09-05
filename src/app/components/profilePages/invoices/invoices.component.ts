import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {


  items!: any;

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My Invoices', routerLink: '/payments-invoices' }
    ];
  }

  displayDetails:string='none';
  onCloseModal(){
    this.displayDetails='none'
  }
  openModal(){
    this.displayDetails='block'
  }

}
