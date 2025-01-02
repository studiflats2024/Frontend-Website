import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../components/blogs/blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<any> {
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const blogId = route.paramMap.get('slug')||'';
    return this.blogService.getBlogDetails(blogId);
  }
}
