import { AppSiderModule } from './../app-sider/app-sider.module';

import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { UserInfoComponent } from './user-info.component';


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
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
const routes: Routes = [
  { path: '', component: UserInfoComponent }
];

@NgModule({
  declarations: [

    UserInfoComponent,


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
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    InputOtpModule,
    PasswordModule,
    FileUploadModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(routes)


  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserInfoModule { }
