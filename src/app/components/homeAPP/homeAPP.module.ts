import { FaqComponent } from './../faq/faq.component';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeAPPRoutingModule } from './homeAPP-routing.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import {FaqModule } from '../faq/faq.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { TooltipModule } from 'primeng/tooltip';

import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import { AppComponent } from '../../app.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    // FooterComponent,
    HomeComponent,
    SearchBarComponent,


  ],
  imports: [
    CommonModule,
    HomeAPPRoutingModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    FloatLabelModule,
    FaqModule,
    CardModule,
    ButtonModule,
    RatingModule,
    GalleriaModule,
    TooltipModule,

    TagModule,
    BadgeModule,
    CarouselModule,
    PaginatorModule,
    ChipModule,
    AvatarModule,
    AvatarGroupModule,
    AuthModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    SearchBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeAPPModule { }
