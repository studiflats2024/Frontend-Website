import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MapPageComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapPageComponent
      }
    ])
  ],
  exports: [
    MapPageComponent
  ]
})
export class MapPageModule { }
