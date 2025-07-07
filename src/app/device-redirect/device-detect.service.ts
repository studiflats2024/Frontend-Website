import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

export type Platform = 'ios' | 'android' | 'other';

@Injectable({ providedIn: 'root' })
export class DeviceDetectService {

  constructor(private readonly dd: DeviceDetectorService) {}

  get platform(): Platform {
    if (this.dd.os === 'iOS')      { return 'ios';     }
    if (this.dd.os === 'Android')  { return 'android'; }
    return 'other';
  }
}
