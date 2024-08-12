import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentDetailsComponent } from './apartment-details.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { GoogleMapsModule } from '@angular/google-maps';

import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';










const routes: Routes = [
  {
    path: '',
    component: ApartmentDetailsComponent
  }
];

@NgModule({
  declarations: [ApartmentDetailsComponent],
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
    GoogleMapsModule,
    AccordionModule,
    StepsModule,
    ToastModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes),

  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApartmentDetailsModule {

}
