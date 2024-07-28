import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './apartment-list.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';

import { CheckboxModule } from 'primeng/checkbox';







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
    FormsModule,
    SliderModule,
    FloatLabelModule,
    InputNumberModule,
    CheckboxModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApartmentListModule {}
