import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { each } from 'jquery';

@Component({
  selector: 'app-share-deep-link',
  templateUrl: './ShareDeepLinkComponent.component.html',
  styleUrls: ['./ShareDeepLinkComponent.component.css']


})
export class ShareDeepLinkComponentComponent implements OnInit {
  skipAutoRedirect:any;
  useragentdetect: string = '';
  platform: string = '';
  flutterAppLink: string = '';
  iosFallbackUrl: string = 'https://apps.apple.com/app/id6474908385';
  androidFallbackUrl: string = 'https://play.google.com/store/apps/details?id=com.studiflats.app';
apartment_code:any;
isIOS:any
  isAndroid: any;
  counter = 5; // 5 seconds
  readonly radius = 54; // Circle radius
  readonly circumference = 2 * Math.PI * this.radius; // For stroke-dasharray
  dashOffset = this.circumference; // Start fully 'unfilled'


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {



    this.useragentdetect = window.navigator.userAgent || 'User Agent not detected';
    this.platform = this.getPlatform(); // Detect the platform
    const userAgent = window.navigator.userAgent;
    this.isIOS = /iPhone|iPad|iPod/i.test(userAgent);

    // Retrieve the shortCode or Apartment_ID from the URL
    const code = this.route.snapshot.paramMap.get('code');
    this.apartment_code=code;
    // Define Flutter App Link
    this.flutterAppLink = `${environment.deepLinkUrl}/Share/${code}`; // ✅ Flutter App Link

    // Redirect to Angular page if not mobile

console.log(this.isMobile());
  // This interval decreases the counter every second
  const timer = setInterval(() => {
    this.counter--;

    // Calculate the current progress (0 = no progress, 1 = fully complete)
    const progress = (5 - this.counter) / 5;
    // Update the stroke-dashoffset to create the filling effect
    this.dashOffset = this.circumference - (this.circumference * progress);

    if (this.counter <= 0) {
      clearInterval(timer);
      // Redirect to your desired route/URL
      // Example: route within Angular
      if(this.isMobile()==false)
      {
      this.router.navigate([`/apartment-details`, code]);

      }
      else{
        if(this.isAndroid)
        {
        this.openAndroidAppWithDeepLink();
        }
        else{
          this.openIOSAppWithDeepLink();
        }
      }

      // Or external URL:
      // window.location.href = 'https://example.com';
    }
  }, 1000);




  }
  goToPlayStore(): void {
    window.location.href = this.androidFallbackUrl;
  }

  goToAppStore(): void {
    window.location.href = this.iosFallbackUrl;
  }
  // ✅ Detect Platform
  getPlatform(): string {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      this.isIOS=true;
      return 'iOS';
    } else if (/Android/i.test(userAgent)) {
      this.isAndroid=true;
      return 'Android';
    } else if (/Windows NT/i.test(userAgent)) {
      return 'Windows';
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
      return 'MacOS';
    } else if (/Linux/i.test(userAgent)) {
      return 'Linux';
    } else {
      return 'Unknown';
    }
  }

  // ✅ Check if the user is on Mobile
  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  openIOSAppWithDeepLink(): void {
    if (this.isIOS && this.apartment_code) {
      window.location.href = `studiflats://apartment/${this.apartment_code}`;
      setTimeout(() => {
        window.location.href = this.iosFallbackUrl;
      }, 5500);
    } else {
      alert('Either not iOS or no apartment code specified.');
    }
  }

  openAndroidAppWithDeepLink(): void {
    if (this.isAndroid && this.apartment_code) {
      window.location.href = this.flutterAppLink;
      setTimeout(() => {
        window.location.href = this.androidFallbackUrl;
      }, 5500);
    } else {
      alert('Either not Android or no apartment code specified.');
    }
  }


}
