
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AprtDescripeComponent } from './aprt-descripe.component';

import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';  // PrimeNG input text
import { InputTextareaModule } from 'primeng/inputtextarea';



const routes: Routes = [
  { path: '', component: AprtDescripeComponent }
];

@NgModule({
  declarations: [

    // AprtTypeComponent


  ],
  imports: [

    InputTextareaModule,
    InputTextModule,


    RouterModule.forChild(routes)
  ],
  exports: [
    // AprtTypeComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AprtDescripeModule { }
