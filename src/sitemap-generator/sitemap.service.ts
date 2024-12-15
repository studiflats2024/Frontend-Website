import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  private baseUrl = 'http://localhost:4200'; // Your base URL

  constructor(private http: HttpClient) {}

  // Static routes
  getStaticRoutes(): string[] {
    return [
      '',
      'contact',
      'faq',
      'about-us',
      'apartment-list',
      'my-bookings',
      'my-wishlist',
      'user-info',
      'privacy-policy',
      'impressum',
    ];
  }

 
getDynamicBlogRoutes(pageNo: number, pageSize: number): Promise<string[]> {
    // Create HttpParams with pagination details
    const params = new HttpParams()
      .set('PageNo', pageNo.toString())
      .set('PageSize', pageSize.toString());

    // Make the HTTP request with params
    return this.http
      .get<any>('https://devapi.studiflats.com/api/Basics/Get_AllBlogs', { params })
      .toPromise()
      .then((blogs) => {
        // Log the response to check the structure
        console.log('Blogs response:', blogs.data);
        let blogsArr=blogs.data
        // Ensure blogs is an array before using map
        if (Array.isArray(blogsArr)) {
          return blogsArr.map((blog: any) => `blog-details/${blog.blog_ID}`);
        } else {
          console.error('The response is not an array:', blogs);
          return [];
        }
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        return [];
      });
  }

  // Generate sitemap
  async generateSitemap(): Promise<string> {
    const staticRoutes = this.getStaticRoutes();
    const dynamicRoutes = await this.getDynamicBlogRoutes(1,2000);

    const routes = [...staticRoutes, ...dynamicRoutes];
    const urls = routes.map((route) => `<url><loc>${this.baseUrl}/${route}</loc></url>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }
}
