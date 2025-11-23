
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommunityClubFormComponent } from './community-club-form.component';


// import { FooterComponent } from '../homeAPP/footer/footer.component';

const routes: Routes = [
  { path: '', component: CommunityClubFormComponent}
];

@NgModule({
  declarations: [CommunityClubFormComponent ],
  imports: [
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommunityClubModule { }
