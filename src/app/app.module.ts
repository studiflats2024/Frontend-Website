import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeAPPModule } from './components/homeAPP/homeAPP.module';
//  import { HeaderComponent } from './components/homeAPP/header/header.component';
 import { FooterComponent } from './components/homeAPP/footer/footer.component';

// import { SearchBarComponent } from './components/homeAPP/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    //  HeaderComponent,
     FooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeAPPModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
