import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-redirect',
  template: '<p>Redirecting...</p>'
})
export class ShareDeepLinkComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    // Retrieve the shortCode or Apartment_ID from the URL
    const code = this.route.snapshot.paramMap.get('code');

    // Define platform-specific fallback URLs
    const androidFallbackUrl = 'https://play.google.com/store/apps/details?id=com.studiflats.app';
    const iosFallbackUrl = 'https://apps.apple.com/app/id6474908385';
    const deepLink = `StudiFlats://Apartment?ID=${code}`;
    // const flutterUniversalLink = `https://dev.studiflats.com/Share/${code}`;
    const flutterUniversalLink = `${environment.deepLinkUrl}/Share/${code}`;


    // Detect platform
    const userAgent = window.navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

    if (isMobile) {
      // Redirect to the mobile deep link
      window.location.href = flutterUniversalLink;

      // Fallback after a short timeout
      setTimeout(() => {
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          window.location.href = iosFallbackUrl;
        } else if (/Android/i.test(userAgent)) {
          window.location.href = androidFallbackUrl;
        }
      }, 2000);
    } else {
      // Redirect to the Angular route for browsers
      this.router.navigate([`/apartment-details`, code]);
    }
  }

}
