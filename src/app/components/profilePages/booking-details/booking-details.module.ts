import { AppSiderModule } from './../app-sider/app-sider.module';

import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BookingDetailsComponent } from './booking-details.component';


import { RouterModule, Routes } from '@angular/router';
import { AppSiderComponent } from '../app-sider/app-sider.component';

import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  // استيراد CommonModule
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  { path: '', component: BookingDetailsComponent }
];

@NgModule({
  declarations: [

    BookingDetailsComponent,


  ],
  imports: [
    AppSiderModule,
    PanelMenuModule,
    TieredMenuModule,
    ToastModule,
    MenuModule,
    ButtonModule ,
    CommonModule,
    CardModule,
    BreadcrumbModule,
    ToolbarModule,
    DialogModule,
    InputTextareaModule,
    FormsModule,
    CalendarModule,
    RouterModule.forChild(routes)

  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingDetailsModule { }
