import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',

  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  first: number = 0; // The index of the first record
  rows: number = 10; // The number of rows per page
  totalRecords: number = 120; // Total number of records (can be dynamic)

  // This method is triggered when the page changes
  onPageChange(event: any) {
    this.first = event.first; // Index of the first record in the new page
    this.rows = event.rows;   // Number of rows to display per page
    console.log('Page changed:', event);
  }
}
