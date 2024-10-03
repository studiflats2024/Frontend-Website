
import { Component, ComponentFactoryResolver, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicHostDirective } from './dynamic-host.directive';
import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';
import { AprtLocationComponent } from '../aprt-location/aprt-location.component';
import { AprtTypeComponent } from '../aprt-type/aprt-type.component';
import {AprtAmenitiesComponent } from '../aprt-amenities/aprt-amenities.component';
import {AprtPhotosComponent } from '../aprt-photos/aprt-photos.component';
import {AprtDescripeComponent } from '../aprt-descripe/aprt-descripe.component';
import {AprtRulesComponent } from '../aprt-rules/aprt-rules.component';



import { Steps } from 'primeng/steps';

@Component({
  selector: 'app-lord-steps',
  templateUrl: './lord-steps.component.html',
  styleUrls: ['./lord-steps.component.scss']
})
export class LordStepsComponent implements AfterViewInit {
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

  activeIndex: number = 0;
  components = [AprtLocationComponent,AprtTypeComponent, AprtDetailsComponent,AprtAmenitiesComponent,AprtPhotosComponent,AprtDescripeComponent,AprtRulesComponent];
  currentComponent: any = null;

  steps: any[] = [
    { label: 'Step 1', title: 'Apartment Location', description: 'Please Enter Apartment Location' },
    { label: 'Step 2', title: 'Apartment Type', description: 'Please Enter Apartment Type' },
    { label: 'Step 3', title: 'Apartment Details', description: 'Please Enter Apartment Details' },
    { label: 'Step 4', title: 'Amenities Provided', description: 'Please Enter Available Amenities' },
    { label: 'Step 5', title: 'Apartment Photos', description: 'Upload Photos of Your Apartment' },
    { label: 'Step 6', title: 'Describe Apartment', description: 'Provide A Detailed Description' },
    { label: 'Step 7', title: 'Pricing And Rules', description: 'Provide Pricing and House Rules' },
    { label: 'Step 8', title: 'Review And Confirm', description: 'Please Review Apartment Details' }
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent(this.activeIndex);
  }

  ngAfterViewInit(): void {
    // No need to manually update step classes
    // PrimeNG will automatically handle the active step styles.
  }
  onStepChange(): void {
    console.log('Step index changed:', this.activeIndex);
    this.loadComponent(this.activeIndex);  // Load the relevant component
  }

  loadComponent(index: number): void {
    if (index === 0 && this.firstClick === true) {
      if (this.currentComponent && this.currentComponent.instance instanceof AprtLocationComponent) {
  console.log('hererrrr')
        this.currentComponent.instance.firstStepCompleted = true;
        console.log( this.currentComponent.instance.firstStepCompleted)
      }
      return;
    }
      // Pass the boolean value to AprtLocationComponent when activeIndex === 0
      // if (index === 0 && this.currentComponent.instance instanceof AprtLocationComponent) {
      //   this.currentComponent.instance.firstStepCompleted = this.activeIndex === 0; // Pass boolean
      //   return;
      // }
    const component = this.components[index];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<any>(component);

    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear(); // Clear any previously loaded component

    this.currentComponent = viewContainerRef.createComponent(componentFactory);
  }

  firstClick:boolean=false;
  hideNext:boolean=false;
  next(): void {
    this.hideNext=false;

    this.firstClick=!this.firstClick;

    // if (this.activeIndex < this.components.length - 1) {
      if (this.activeIndex < this.steps.length - 1) {
       if(this.activeIndex===0 && this.firstClick===true){
        this.loadComponent(this.activeIndex);
        this.hideNext=true;
        return;
       }
      this.activeIndex++;
      this.loadComponent(this.activeIndex);
    }
  }

  prev(): void {

      this.activeIndex--;
      this.loadComponent(this.activeIndex);

  }

  ngOnDestroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }
}
