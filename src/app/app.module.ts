import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeAPPModule } from './components/homeAPP/homeAPP.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeAPPModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
