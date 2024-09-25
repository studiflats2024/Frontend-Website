import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, AfterViewInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DynamicHostDirective } from './dynamic-host.directive';
import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';
import { AprtLocationComponent } from '../aprt-location/aprt-location.component';
import { Steps } from 'primeng/steps';

@Component({
  selector: 'app-lord-steps',
  templateUrl: './lord-steps.component.html',
  styleUrls: ['./lord-steps.component.scss']
})
export class LordStepsComponent implements AfterViewInit {
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;
  // @ViewChild('stepper', { static: false }) stepper!: ElementRef;
  @ViewChild('stepper', { static: false, read: ElementRef }) stepper!: ElementRef;

  activeIndex: number = 0;
  components = [AprtLocationComponent,AprtDetailsComponent /* add other components here */];
  currentComponent: any = null;
  steps: any[] = [
    { label: 'Apartment Location' },
    { label: 'Apartment Type' },
    { label: 'Apartment Details' },
    { label: 'Amenities Provided' },
    { label: 'Apartment Photos' },
    { label: 'Describe Apartment' },
    { label: 'Pricing and Rules' },
    { label: 'Review and Confirm' }
  ];


  constructor(private cdRef: ChangeDetectorRef,private componentFactoryResolver: ComponentFactoryResolver,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadComponent(this.activeIndex);

  }
  ngAfterViewInit(): void {
    // Add a delay to ensure the view is fully initialized
    setTimeout(() => {
      if (this.stepper) {
        console.log('Stepper Element:', this.stepper.nativeElement); // Debugging step
        this.updateStepClasses();
      } else {
        console.error('Stepper element not found!');
      }
    }, 0);
  }

    // Method to dynamically add 'p-highlight' and remove 'p-disabled' based on activeIndex

  updateStepClasses() {
    const stepItems = this.stepper.nativeElement.querySelectorAll('.p-steps-item');
    console.log('Step Items:', stepItems); // Debug
    stepItems.forEach((step: any, index: number) => {
      if (index < this.activeIndex) {
        this.renderer.addClass(step, 'p-highlight');
        this.renderer.removeClass(step, 'p-disabled');
        step.classList.add('p-highlight');
        step.classList.remove('p-disabled');
        console.log( step )
        console.log(this.activeIndex)
        console.log('Step Items:', stepItems);
      } else if (index === this.activeIndex) {
        this.renderer.addClass(step, 'p-highlight');
      } else {
        this.renderer.removeClass(step, 'p-highlight');
        this.renderer.addClass(step, 'p-disabled');
      }
    });
    this.cdRef.detectChanges();
  }

  loadComponent(index: number) {
    const component = this.components[index];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear(); // Clear any previously loaded component

    this.currentComponent = viewContainerRef.createComponent(componentFactory);

  }

  next() {
    if (this.activeIndex < this.components.length - 1) {
      this.activeIndex++;
      this.loadComponent(this.activeIndex);
      this.updateStepClasses();
    }
  }

  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.loadComponent(this.activeIndex);
      this.updateStepClasses();
    }
  }

  ngOnDestroy() {
    if (this.currentComponent) {
      this.currentComponent.destroy(); // Clean up the current component
    }
  }
}
