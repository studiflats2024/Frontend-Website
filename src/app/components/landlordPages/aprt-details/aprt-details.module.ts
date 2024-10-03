
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputOtpModule } from 'primeng/inputotp';



const routes: Routes = [
  { path: '', component: AprtDetailsComponent }
];

@NgModule({
  declarations: [

    // AprtLocationComponent


  ],
  imports: [


    CommonModule,
    FormsModule,
    InputOtpModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    // AprtLocationComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AprtDetailsModule { }
