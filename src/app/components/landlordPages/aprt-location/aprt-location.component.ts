import { Component, AfterViewChecked, Input, OnChanges, SimpleChanges , DoCheck } from '@angular/core';
import { LordStepsComponent } from '../lord-steps/lord-steps.component';

declare let L: any;
declare var intlTelInput: any;
@Component({
  selector: 'app-aprt-location',

  templateUrl: './aprt-location.component.html',
  styleUrls: ['./aprt-location.component.css']
})
export class AprtLocationComponent implements AfterViewChecked, OnChanges , DoCheck  {
  @Input() firstStepCompleted: boolean = false;
  map: any;  // Map instance
  marker: any;  // Marker instance

  // Default location (Berlin)
  defaultLocation = [52.5200, 13.4050];

  constructor(private parent: LordStepsComponent) {}

  callParentFunction() {
    this.parent.next();
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.initializeMap();
    },  500);

  }
  ngOnChanges(): void {
    console.log(this.firstStepCompleted)
    if (this.firstStepCompleted) {
      console.log('First step is completed!');
      // Do something when firstStepCompleted is true
    }

  }
 stop:any=''
 sectionVisible:boolean=false;
  ngDoCheck(): void {
    if (this.firstStepCompleted === true && this.stop==='') {
      console.log('First step is completed! (detected by DoCheck)');
      this.stop='done'
      this.sectionVisible=true;
      // قم بإعادة تعيين `firstStepCompleted` إذا لزم الأمر
    }
  }



  ngAfterViewChecked() {


      const input = document.querySelector("#phoneLord") as HTMLInputElement;

      // Check if the input exists and hasn't been initialized before
      if (input && !input.dataset['itiInitialized']) {
        console.log('Phone input element found and initializing intlTelInput:', input);

        // Initialize intlTelInput
        const iti = intlTelInput(input, {
          initialCountry: "de",
          preferredCountries: ["de", "us", "gb"],
          separateDialCode: true,
          // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
           searchCountry:true,
          useFullscreenPopup: false,

        });





        input.dataset['itiInitialized'] = 'true';
        console.log(input.dataset['itiInitialized'])


        input.addEventListener('blur', () => {
          let fullPhoneNumber = iti.getNumber();
          if (fullPhoneNumber.startsWith("+")) {
            fullPhoneNumber = fullPhoneNumber.substring(1);
          }
          console.log("Full phone number:", fullPhoneNumber);

        });



        input.addEventListener("countrychange", function() {



    const flagContainer = document.querySelector(".iti__selected-flag");
    const dialCodeElement = document.querySelector(".iti__dial-code");
    console.log(flagContainer,dialCodeElement)

    if (flagContainer) {
        flagContainer.classList.remove("iti__selected-flag");
    }
    if (dialCodeElement) {
        dialCodeElement.textContent = '';
    }


    const selectedCountryData = iti.getSelectedCountryData();


    if (flagContainer) {
        flagContainer.classList.add("iti__selected-flag");
        dialCodeElement!.textContent = "+" + selectedCountryData.dialCode;
    }

    console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);


      });
      }



  }





  // Initialize the map
  initializeMap(): void {
    // Create the map instance and set its view to the default location
    this.map = L.map('map').setView(this.defaultLocation, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a default marker
    this.marker = L.marker(this.defaultLocation).addTo(this.map)
      .bindPopup('Berlin')
      .openPopup();
  }

  // Locate the user's position using the browser's geolocation
  locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];

        // Set the map view to the user's location
        this.map.setView(userLocation, 13);

        // Move the marker to the user's location
        if (this.marker) {
          this.marker.setLatLng(userLocation).bindPopup('You are here').openPopup();
        } else {
          this.marker = L.marker(userLocation).addTo(this.map)
            .bindPopup('You are here')
            .openPopup();
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }




  //////INFO///////////
  userName:string='';
  emaill:any;
  phoneNumber:any;
  otp:any;
  // refreshOtp(): void {

  //   this.userService.refreshOtp(this.uuidforgot).subscribe(
  //     (response) => {
  //       console.log('OTP refreshed successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error refreshing OTP:', error);
  //     }
  //   );
  // }
}
