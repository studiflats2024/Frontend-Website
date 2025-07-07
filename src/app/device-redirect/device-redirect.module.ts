import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { deviceRedirectGuard } from './device-redirect.guard';
import { NoMobileComponent } from './no-mobile/no-mobile.component';

@NgModule({
  imports: [
    // Route is empty because the module is lazy-loaded at /Download
    RouterModule.forChild([
      {
        path: '',
        canActivate: [deviceRedirectGuard],
        component  : NoMobileComponent
      }
    ]),
    NoMobileComponent              // standalone comp exported into NgModule
  ]
})
export class DeviceRedirectModule {}
