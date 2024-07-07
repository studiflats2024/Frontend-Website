import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './apartment-list.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';







const routes: Routes = [
  {
    path: '',
    component: ApartmentListComponent
  }
];

@NgModule({
  declarations: [ApartmentListComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RatingModule,
    RouterModule.forChild(routes),
  ]
})
export class ApartmentListModule {}
