import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import {  AboutUsComponent } from './about-us.component';


const routes: Routes = [
  { path: '', component:  AboutUsComponent }
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ AboutUsComponent]
})
export class AboutUsModule { }
