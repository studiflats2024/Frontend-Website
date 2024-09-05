
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppSiderComponent } from './app-sider.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';  // استيراد CommonModule
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';


import { RouterModule, Routes } from '@angular/router';



// const routes: Routes = [
//   { path: '', component: AppSiderComponent }
// ];

@NgModule({
  declarations: [

    AppSiderComponent

  ],
  imports: [
    PanelMenuModule,
    TieredMenuModule,
    ToastModule,
    MenuModule,
    ButtonModule ,
    CommonModule,
    // RouterModule.forChild(routes)
  ],
  exports: [
    AppSiderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSiderModule { }
