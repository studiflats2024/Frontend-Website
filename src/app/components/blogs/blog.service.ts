import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogId: string | null = null;

  setBlogId(id: string): void {
    this.blogId = id;
  }

  getBlogId(): string | null {
    return this.blogId;
  }

  clearBlogId(): void {
    this.blogId = null;
  }

  constructor(private http: HttpClient) {}
  token: any = localStorage.getItem('token');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  createNewBlog(blogData: any): Observable<any> {
    const url = `${environment.apiUrl}/Basics/Create_New_Blog`;
    return this.http.post(url, blogData,{headers:this.headers});
  }

  getBlogDetails(blogId: string): Observable<any> {
    const params = new HttpParams().set('Blog_ID', blogId);
    return this.http.get(`${environment.apiUrl}/Basics/Get_BlogDetails`, { params,headers:this.headers });
  }


  getAllBlogs(pageNo: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('PageNo', pageNo.toString())
      .set('PageSize', pageSize.toString());

    return this.http.get(`${environment.apiUrl}/Basics/Get_AllBlogs`, { params, headers: this.headers });
  }
  updateBlog(blogData: any): Observable<any> {
    const url = `${environment.apiUrl}/Basics/Update_Blog`;
    return this.http.post(url, blogData,{headers:this.headers});
  }
}
