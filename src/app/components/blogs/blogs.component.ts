import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { BlogService } from './blog.service';

@Component({
  selector: 'app-blogs',

  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

loading:boolean=true;
  constructor( private blogService: BlogService ,public router: Router){}


  ngOnInit() {
    this.fetchBlogs();


   }


// This method is triggered when the page changes
// onPageChange(event: any) {
//   this.first = event.first;
//   this.rows = event.rows;
//   console.log('Page changed:', event);
// }
displayMenu:string='none';
// openMenu(){
//   if(this.displayMenu==='block'){
//   this.displayMenu='none';

//   }else{
//     this.displayMenu='block';
//   }

// }
openMenuIndex: number | null = null;
openMenu(index: number): void {
  // Toggle the menu for the clicked index, close if it's already open
  this.openMenuIndex = this.openMenuIndex === index ? null : index;
}


blogs: any[] = [];
  pageNo: number = 1;
  pageSize: number = 10;


  first: number = 0;
  rows: number = 10; // Number of rows per page
  totalRecords: number = 0;

  fetchBlogs(): void {
    const pageNo = this.first / this.rows + 1;
    this.blogService.getAllBlogs(pageNo, this.rows).subscribe(
      (response) => {
        this.blogs = response.data; // Adjust this based on your API response structure.
        this.totalRecords = response.total_Records ; // Update this if the API returns total records.
        console.log(this.blogs)
        console.log(this.totalRecords)
        this.loading=false;

      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  editBlog(blog: any): void {
    this.blogService.setBlogId(blog.blog_ID);
    this.router.navigate(['blogs/update', blog.blog_Slug]);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.fetchBlogs();
  }

  viewBlogDetails(blog: any): void {
    this.blogService.setBlogId(blog.blog_ID);
    this.router.navigate(['blog-details',blog.blog_Slug]);
  }
}
