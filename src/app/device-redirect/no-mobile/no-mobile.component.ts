import { Component } from '@angular/core';

@Component({
  selector: 'app-no-mobile',
  standalone: true,                 // Angular 18 standalone component
  template: `
    <section class="flex flex-col items-center gap-4 p-8">
      <h1 class="text-2xl font-semibold">Get the App</h1>

      <p class="max-w-md text-center">
        It looks like you’re on a desktop device.<br>
        Scan the QR code below or open this page on your phone to install the
        mobile app.
      </p>

      <img src="/assets/AppQR.png"
           alt="QR code linking to /Download"
           width="160" height="160">

      <button routerLink="/" class="btn-primary mt-6">
        Back to Website
      </button>
    </section>
  `,
  styles: [`
    .btn-primary {
      @apply px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700;
    }
  `]
})
export class NoMobileComponent {}
