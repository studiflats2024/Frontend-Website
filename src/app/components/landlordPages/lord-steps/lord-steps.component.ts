// import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, AfterViewInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
// import { DynamicHostDirective } from './dynamic-host.directive';
// import { AprtDetailsComponent } from '../aprt-details/aprt-details.component';
// import { AprtLocationComponent } from '../aprt-location/aprt-location.component';
// import { Steps } from 'primeng/steps';

// @Component({
//   selector: 'app-lord-steps',
//   templateUrl: './lord-steps.component.html',
//   styleUrls: ['./lord-steps.component.scss']
// })
// export class LordStepsComponent implements AfterViewInit {
//   @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

//   @ViewChild('stepper', { static: false, read: ElementRef }) stepper!: ElementRef;

//   activeIndex: number = 0;
//   components = [AprtLocationComponent,AprtDetailsComponent  ];
//   currentComponent: any = null;
//   steps: any[] = [
//     { label: 'Apartment Location' },
//     { label: 'Apartment Type' },
//     { label: 'Apartment Details' },
//     { label: 'Amenities Provided' },
//     { label: 'Apartment Photos' },
//     { label: 'Describe Apartment' },
//     { label: 'Pricing and Rules' },
//     { label: 'Review and Confirm' }
//   ];


//   constructor(private cdRef: ChangeDetectorRef,private componentFactoryResolver: ComponentFactoryResolver,private renderer: Renderer2) {}

//   ngOnInit(): void {
//     this.loadComponent(this.activeIndex);

//   }
//   ngAfterViewInit(): void {

//     setTimeout(() => {
//       if (this.stepper) {
//         console.log('Stepper Element:', this.stepper.nativeElement);
//         this.updateStepClasses();
//       } else {
//         console.error('Stepper element not found!');
//       }
//     }, 0);
//   }



//   updateStepClasses() {
//     const stepItems = this.stepper.nativeElement.querySelectorAll('.p-steps-item');
//     console.log('Step Items:', stepItems);
//     stepItems.forEach((step: any, index: number) => {
//       if (index < this.activeIndex) {
//         this.renderer.addClass(step, 'p-highlight');
//         this.renderer.removeClass(step, 'p-disabled');
//         step.classList.add('p-highlight');
//         step.classList.remove('p-disabled');
//         console.log( step )
//         console.log(this.activeIndex)
//         console.log('Step Items:', stepItems);
//       } else if (index === this.activeIndex) {
//         this.renderer.addClass(step, 'p-highlight');
//       } else {
//         this.renderer.removeClass(step, 'p-highlight');
//         this.renderer.addClass(step, 'p-disabled');
//       }
//     });
//     this.cdRef.detectChanges();
//   }

//   loadComponent(index: number) {
//     const component = this.components[index];
//     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

//     const viewContainerRef = this.dynamicHost.viewContainerRef;
//     viewContainerRef.clear();

//     this.currentComponent = viewContainerRef.createComponent(componentFactory);

//   }

//   next() {
//     if (this.activeIndex < this.components.length - 1) {
//       this.activeIndex++;
//       this.loadComponent(this.activeIndex);
//       this.updateStepClasses();
//     }
//   }

//   prev() {
//     if (this.activeIndex > 0) {
//       this.activeIndex--;
//       this.loadComponent(this.activeIndex);
//       this.updateStepClasses();
//     }
//   }

//   ngOnDestroy() {
//     if (this.currentComponent) {
//       this.currentComponent.destroy();
//     }
//   }
// }
import { Component, ComponentFactoryResolver, ViewChild, AfterViewInit } from '@angular/core';
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

  activeIndex: number = 0;
  components = [AprtLocationComponent, AprtDetailsComponent];
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
    const component = this.components[index];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear(); // Clear any previously loaded component

    this.currentComponent = viewContainerRef.createComponent(componentFactory);
  }

  next(): void {
    // if (this.activeIndex < this.components.length - 1) {
      if (this.activeIndex < this.steps.length - 1) {

      this.activeIndex++;
      this.loadComponent(this.activeIndex);
    }
  }

  prev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.loadComponent(this.activeIndex);
    }
  }

  ngOnDestroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }
}
