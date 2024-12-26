

import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BlogDetailsComponent } from './blog-details.component';


import { RouterModule, Routes } from '@angular/router';


import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  // استيراد CommonModule
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
const routes: Routes = [
  // { path: ':slug', component:BlogDetailsComponent }
];

@NgModule({
  declarations: [

    BlogDetailsComponent,


  ],
  imports: [

    PanelMenuModule,
    TieredMenuModule,
    ToastModule,
    MenuModule,
    ButtonModule ,
    CommonModule,
    CardModule,
    BreadcrumbModule,
    PaginatorModule,
    ToolbarModule,
    RouterModule.forChild(routes)

  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogDetailsModule { }
