import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq.component';


const routes: Routes = [
  { path: '', component: FaqComponent }
];

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  // exports: [FaqComponent]
})
export class FaqModule { }
