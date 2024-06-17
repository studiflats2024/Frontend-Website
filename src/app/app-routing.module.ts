import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: '', loadChildren: () => import('./components/homeAPP/homeAPP.module').then(m => m.HomeAPPModule)
  },
  {
     path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
