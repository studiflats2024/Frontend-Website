

import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BlogsComponent } from './blogs.component';
import { BlogDetailsComponent } from '../blog-details/blog-details.component';



import { RouterModule, Routes } from '@angular/router';
import { ChipModule } from 'primeng/chip';

import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  // استيراد CommonModule
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  // { path: '', component: BlogsComponent }


];

@NgModule({
  declarations: [

    BlogsComponent,
    


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
    ChipModule,
    RouterModule.forChild(routes)

  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogsModule { }
