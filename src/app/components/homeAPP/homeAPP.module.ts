import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeAPPRoutingModule } from './homeAPP-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    HomeAPPRoutingModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    SearchBarComponent
  ]
})
export class HomeAPPModule { }
