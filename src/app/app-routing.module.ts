import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
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
    path: 'booking-details', loadChildren: () => import('./components/profilePages/booking-details/booking-details.module').then(m => m.BookingDetailsModule) // Lazy load FAQ module
  },
  {
    path: 'my-wishlist', loadChildren: () => import('./components/profilePages/wishlist/wishlist.module').then(m => m.WishlistModule) // Lazy load FAQ module
  },
  {
    path: 'user-info', loadChildren: () => import('./components/profilePages/user-info/user-info.module').then(m => m.UserInfoModule) // Lazy load FAQ module
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
