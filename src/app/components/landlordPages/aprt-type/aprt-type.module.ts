
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AprtTypeComponent } from './aprt-type.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputOtpModule } from 'primeng/inputotp';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';



const routes: Routes = [
  { path: '', component: AprtTypeComponent }
];

@NgModule({
  declarations: [

    // AprtTypeComponent


  ],
  imports: [


    CommonModule,
    FormsModule,
    InputOtpModule,
    RadioButtonModule,
    CardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    // AprtTypeComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AprtTypeModule { }
