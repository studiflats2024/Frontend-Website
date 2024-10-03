
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { LordStepsComponent } from './lord-steps.component';
import { DynamicHostDirective } from './dynamic-host.directive';
import { StepsModule } from 'primeng/steps';
import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';
import { AprtLocationComponent } from '../aprt-location/aprt-location.component';
import { MenuModule } from 'primeng/menu';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AprtTypeComponent } from '../aprt-type/aprt-type.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';  // PrimeNG input text
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import {AprtAmenitiesComponent } from '../aprt-amenities/aprt-amenities.component';
import {AprtPhotosComponent } from '../aprt-photos/aprt-photos.component';
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {AprtDescripeComponent } from '../aprt-descripe/aprt-descripe.component';
import {AprtRulesComponent } from '../aprt-rules/aprt-rules.component';




import { DragDropModule } from 'primeng/dragdrop';

// import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: '', component: LordStepsComponent }
];

@NgModule({
  declarations: [

    LordStepsComponent,
    DynamicHostDirective,
    AprtLocationComponent,
    AprtDetailsComponent,
    AprtTypeComponent,
    AprtAmenitiesComponent,
    AprtPhotosComponent,
    AprtDescripeComponent,
    AprtRulesComponent,

     // Other components

  ],
  imports: [
    StepsModule,
    MenuModule,
    CommonModule,
    FormsModule,
    InputOtpModule,
    RadioButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputSwitchModule,
    ButtonModule,
    GalleriaModule,
    FileUploadModule,
    DragDropModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    LordStepsComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LordStepsModule { }
