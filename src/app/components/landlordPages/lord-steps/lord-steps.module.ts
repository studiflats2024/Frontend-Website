
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { LordStepsComponent } from './lord-steps.component';
import { DynamicHostDirective } from './dynamic-host.directive';
import { StepsModule } from 'primeng/steps';
import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';
import { AprtLocationComponent } from '../aprt-location/aprt-location.component';
import { MenuModule } from 'primeng/menu';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  { path: '', component: LordStepsComponent }
];

@NgModule({
  declarations: [

    LordStepsComponent,
    DynamicHostDirective,
    AprtLocationComponent,
    AprtDetailsComponent
     // Other components

  ],
  imports: [
    StepsModule,
    MenuModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LordStepsComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LordStepsModule { }
