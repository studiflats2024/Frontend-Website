// src/app/device-redirect/device-redirect.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { DeviceDetectService } from './device-detect.service';
import { APP_STORE_URL, PLAY_STORE_URL, DESKTOP_LANDING } from './store-links';

export const deviceRedirectGuard: CanActivateFn = (
  /* route: ActivatedRouteSnapshot, state: RouterStateSnapshot */
): boolean | UrlTree => {
  const device = inject(DeviceDetectService);
  const router = inject(Router);

  switch (device.platform) {
    case 'ios':
      window.location.href = APP_STORE_URL;
      return false;                     // stop Angular navigation
    case 'android':
      window.location.href = PLAY_STORE_URL;
      return false;
    default:
      // Let Angular continue to a fallback route / component
      return router.parseUrl(DESKTOP_LANDING);
  }
};
