import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {BlogsComponent}from './components/blogs/blogs.component'
import {BlogDetailsComponent}from './components/blog-details/blog-details.component'
import { SitemapComponent } from '../sitemap-generator/sitemap.component';
import { ShareDeepLinkComponentComponent } from './components/ShareDeepLinkComponent/ShareDeepLinkComponent.component';
import { BlogResolver } from './resolvers/blog.resolver';
import { deviceRedirectGuard } from './device-redirect/device-redirect.guard';

const routes: Routes = [
  { path: 'sitemap', component: SitemapComponent },
  {
    path: '', loadChildren: () => import('./components/homeAPP/homeAPP.module').then(m => m.HomeAPPModule)
  },
  {
     path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'faq', loadChildren: () => import('./components/faq/faq.module').then(m => m.FaqModule) // Lazy load FAQ module
  },
  {
    path: 'about-us', loadChildren: () => import('./components/about-us/about-us.module').then(m => m.AboutUsModule) // Lazy load FAQ module
  },
   {
    path: 'apartment-list',
    loadChildren: () => import('./components/apartment-list/apartment-list.module').then(m => m.ApartmentListModule)
  },
  {
    path: 'apartment-details/:id',
    loadChildren: () => import('./components/apartment-details/apartment-details.module').then(m => m.ApartmentDetailsModule)
  },
  { path: 'map', loadChildren: () => import('./components/map-page/map-page.module').then(m => m.MapPageModule)

  },
  {
    path: 'my-bookings', loadChildren: () => import('./components/profilePages/user-booking/user-booking.module').then(m => m.UserBookingModule) // Lazy load FAQ module
  },
  {
    path: 'booking-details/:bookingID', loadChildren: () => import('./components/profilePages/booking-details/booking-details.module').then(m => m.BookingDetailsModule) // Lazy load FAQ module
  },
  {
    path: 'my-wishlist', loadChildren: () => import('./components/profilePages/wishlist/wishlist.module').then(m => m.WishlistModule) // Lazy load FAQ module
  },
  {
    path: 'user-info', loadChildren: () => import('./components/profilePages/user-info/user-info.module').then(m => m.UserInfoModule) // Lazy load FAQ module
  },
  {
    path: 'payments-invoices', loadChildren: () => import('./components/profilePages/invoices/invoices.module').then(m => m.InvoicesModule) // Lazy load FAQ module
  },
  // {
  //   path: 'blogs', loadChildren: () => import('./components/blogs/blogs.module').then(m => m.BlogsModule)
  // },
  // {
  //   path: 'blog-details', loadChildren: () => import('./components/blog-details/blog-details.module').then(m => m.BlogDetailsModule)
  // },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'blog-details/:slug',
    component: BlogDetailsComponent  ,
    resolve: {
      blog: BlogResolver // ربط الـ Resolver بهذا المسار
    }
  },
  {
    path: 'land-lord-steps', loadChildren: () => import('./components/landlordPages/lord-steps/lord-steps.module').then(m => m.LordStepsModule) // Lazy load FAQ module
  },
  {
    path: 'impressum', loadComponent: () =>  import('./components/impressum/impressum.component').then(m => m.ImpressumComponent) // Lazy load FAQ module
  },
  {
    path: 'privacy-policy', loadComponent: () =>  import('./components/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) // Lazy load FAQ module
  },
  // { path: 'Share/:code', component: ShareDeepLinkComponentComponent },
  { 
  path: 'Share/:code',
  canActivate: [deviceRedirectGuard],         // ✅ ضيفي الجارد هنا
  component: ShareDeepLinkComponentComponent
},

{
    path: 'Download',
    loadChildren: () =>
      import('./device-redirect/device-redirect.module')
        .then(m => m.DeviceRedirectModule)
  },

  // Optional: make /download (lowercase) redirect to /Download
  { path: 'download', redirectTo: 'Download', pathMatch: 'full' }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
