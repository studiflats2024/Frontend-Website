
import { Component, AfterViewInit, ViewChild, ElementRef ,OnInit } from '@angular/core';

import { BlogService } from '../blogs/blog.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',

  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, AfterViewInit {
  items:any;
  loading:boolean=true;

  blogId: string | null = null;
  blogSlug: string | null = null;
  constructor(  private route: ActivatedRoute,private titleService: Title, private metaService: Meta,private blogService: BlogService) {
    // this.blogId = this.blogService.getBlogId()|| localStorage.getItem('blogId');

    
    // if (this.blogId) {
    //   this.loadBlogDetails(this.blogId);
    //   localStorage.setItem('blogId', this.blogId);
    // }   else {
 
    //   console.error('No blog ID found');
    // }

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    { label: 'blog details', routerLink: '/' }
    ]


    

    // this.titleService.setTitle(this.title);
    // this.metaService.updateTag({ name: 'description', content: this.metaDes });

    // this.metaService.updateTag({ property: 'og:title', content:this.title });
    // this.metaService.updateTag({ property: 'og:description', content: this.metaDes});
    // this.metaService.updateTag({ property: 'og:url', content: window.location.href });
  }

 ngOnInit() {

  // this.blogId = this.blogService.getBlogId()|| localStorage.getItem('blogId');

  //   if (this.blogId) {
  //     this.loadBlogDetails(this.blogId);
  //     localStorage.setItem('blogId', this.blogId);
  //   }   else {
  
  //     console.error('No blog ID found');
  //   }
  this.blogSlug = this.route.snapshot.paramMap.get('slug') || '';
  console.log('Blog Slug:', this.blogSlug);

  // 2. Fetch blog details from the service
  if (this.blogSlug) {
    this.loadBlogDetails(this.blogSlug);
  }

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    { label: 'blog details', routerLink: '/' }
    ]

    this.titleService.setTitle(this.title);

     

    // this.titleService.setTitle(this.title);
    // this.metaService.updateTag({ name: 'description', content: this.metaDes });

    // this.metaService.updateTag({ property: 'og:title', content:this.title });
    // this.metaService.updateTag({ property: 'og:description', content: this.metaDes});
    // this.metaService.updateTag({ property: 'og:url', content: window.location.href });

 }

 ngAfterViewInit() {
 
}



   /**
  * addItem
  * @param value string
  * @returns void
  */
 showSide:string='';
 addItem(value: string): void {
  this.showSide = value
}

 /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 Date:any="All"

 selectedfromDropDown(value:any){

  this.Date=value.name;


}

title:string=''
metaDes:string=''
desc:string=''
altImg:string=''
blogContent:any;
category:any;
keywords:any;
quill: any;
images:any;
blogDate:any;
loadBlogDetails(blogSlug: string): void {
  this.blogService.getBlogDetails(blogSlug).subscribe(
    (blog) => {
      console.log(blog)
      this.title = blog.blog_Title;
       
    
      this.titleService.setTitle(this.title);
      console.log(this.titleService.setTitle(this.title))

      this.metaDes = blog.blog_Meta_Desc;
      this.metaService.updateTag({ name: 'description', content: this.metaDes });
      this.desc = blog.blog_Desc;
      console.log(this.title,this.metaDes)
      
      this.altImg = blog.blog_Image_Alt;
      this.blogContent = blog.blog_Content;
      this.category = blog.blog_Category;
      this.keywords = blog.blog_KeyWords || [];
      // this.quill.root.innerHTML = this.blogContent;
      // Optionally, load images if necessary
      this.images = blog.blog_Main_Image;
      this.blogDate=blog.blog_Created_at

      this.loading=false;

        // Add other relevant meta tags (optional)
    this.metaService.updateTag({ property: 'og:title', content:this.title });
    this.metaService.updateTag({ property: 'og:description', content: this.metaDes});
    this.metaService.updateTag({ property: 'og:url', content: window.location.href });

    const canonicalUrl = `https://studiflats.de/blog-details/${this.blogSlug}`;
    this.metaService.updateTag({ rel: 'canonical', href: canonicalUrl });

    console.log(`Canonical tag added: ${canonicalUrl}`);
    
    },
    (error) => {
      console.error('Error loading blog details:', error);
    }
  );
}

ngOnDestroy() {
  // Clear the blogId from local storage when leaving the component
  localStorage.removeItem('blogId');
}
}
