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
    path: 'apartment-list',
    loadChildren: () => import('./components/apartment-list/apartment-list.module').then(m => m.ApartmentListModule)
  },
  { path: 'map', loadChildren: () => import('./components/map-page/map-page.module').then(m => m.MapPageModule) }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
