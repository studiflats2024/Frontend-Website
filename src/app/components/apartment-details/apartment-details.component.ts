






import { Component, OnInit ,  HostListener,  AfterViewInit} from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FaqService } from '../../services/faq.service';
import $ from 'jquery';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService  } from '../../services/user.service';

import { HttpClient } from '@angular/common/http';

declare var intlTelInput: any;
declare var intlTelInputUtils: any;


interface FAQ {
  faq_ID: string;
  faq_Quest: string;
  faq_Ans: string;
}

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit,AfterViewInit {
  apartments: Apartment[] = [];
  subscriptions: Subscription[] = [];
  loginMethod: string = 'whatsApp';
  loginForm!: FormGroup;


  constructor(
    private apartmentService: ApartmentService,
    private router: Router,
    private messageService: MessageService ,
    public _ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private faqService: FaqService,
    private fb: FormBuilder,
    private userService: UserService,)
     {
    this.apt_UUID = _ActivatedRoute.snapshot.paramMap.get('id');

    }




  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 8;

  faqs: FAQ[] = [];

  fetchFaqs(): void {
    this.faqService.getFaqs().subscribe((data: FAQ[]) => {
      this.faqs = data;
    });
  }
  items:any=[];
  activeIndex: number = 0;
  openModalsCount = 0;

//ng on init ------------------------------
  ngOnInit() {
    $('.modal').on('shown.bs.modal', () => {
      this.openModalsCount++;

    }).on('hidden.bs.modal', () => {
      this.openModalsCount--;
      if (this.openModalsCount > 0) {
        $('body').addClass('modal-open');
      } else {
        $('body').removeClass('modal-open');
      }
    });
    this.items = [
      { label: 'select your need' },
      { label: 'enter guests details' },
      { label: 'booking summary' },

    ];
    this. onWindowScroll()
    this.getApartmentDetails();
    this.checkViewportWidth();
    this.fetchFaqs();

    this.loginForm = this.fb.group({
      mobile: '',

      email: '',
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],

    } );




    const input = document.querySelector("#phone");

    if (input) {
      const iti = intlTelInput(input, {
        initialCountry: "de",  // الدولة الافتراضية
        preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
        separateDialCode: true,  // فصل كود الدولة
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"  // تحميل سكربت الأدوات المساعدة
      });

      // حدث عند فقدان التركيز على الحقل
      input.addEventListener('blur', () => {
        let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);  // الحصول على الرقم بتنسيق E164
        if (fullPhoneNumber.startsWith("+")) {
          fullPhoneNumber = fullPhoneNumber.substring(1);  // إزالة رمز "+"
        }
        console.log("Full phone number:", fullPhoneNumber);
        this.loginForm.patchValue({ mobile: fullPhoneNumber });
        console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
         console.log(typeof( this.loginForm.value.mobile))
      });
    } else {
      console.error("The phone input element was not found.");
    }



  }

  displayModal:any;
  displayModalbooking:any;
  displayModalsuccess:any;
  openModals(){
     this.displayModal='block';

  }
  openModalsuccess(){
    this.displayModalsuccess='block';
    this.displayModalbooking='none';
    this.displayModal='none';
 }
 openModalbooking(){
  this.displayModalbooking='block';

}
onCloseQrModal() {
  this.displayModalsuccess='none';
    this.displayModalbooking='none';
    this.displayModal='none';
}

ngAfterViewInit(): void {

  const input = document.querySelector("#phone");

  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: "de",  // الدولة الافتراضية
      preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
      separateDialCode: true,  // فصل كود الدولة
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"  // تحميل سكربت الأدوات المساعدة
    });

    // حدث عند فقدان التركيز على الحقل
    input.addEventListener('blur', () => {
      let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);  // الحصول على الرقم بتنسيق E164
      if (fullPhoneNumber.startsWith("+")) {
        fullPhoneNumber = fullPhoneNumber.substring(1);  // إزالة رمز "+"
      }
      console.log("Full phone number:", fullPhoneNumber);
      this.loginForm.patchValue({ mobile: fullPhoneNumber });
      console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
       console.log(typeof( this.loginForm.value.mobile))
    });
  } else {
    console.error("The phone input element was not found.");
  }

  this.loginForm.reset();

}



  isVisible:boolean=true;

  @HostListener('window:scroll', [])
onWindowScroll() {
  const sections = document.getElementsByClassName('section-to-watch');
  this.isVisible = !Array.from(sections).some(section => {
    const rect = (section as HTMLElement).getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if at least half of the section is within the viewport
    const isSectionVisible = (
      rect.top < windowHeight / 0.9 && rect.bottom > windowHeight / 2
    );

    //   console.log(this.isVisible);
    // console.log(sections);
    // console.log(isSectionVisible);

    return isSectionVisible;
  });
  this.checkViewportWidth();


}



  onStepChange(event: any) {
    this.activeIndex = event.index;
  }
  showBooking:boolean=true;

  onsubmitLogin(){
  this.showBooking=true;
  }


  // get apartment details
  apt_UUID:any;
  allResponse:any;
  aprt: any = {};
  aprt_Imgs: any[] = [];
  trasponrts: any[] = [];
  rent_Rules: any[] = [];
  features: any[] = [];
  facilities: any[] = [];
  contract_Main: any = {};
  bath_Room: any[] = [];
  backup_Info: any = {};
  owner_contract_file_name: string = '';
  tenant_contract_file_name: string = '';
  centerr: { lat: number; lng: number } = { lat: 0, lng: 0 };
  kitchen_Tools: any[] = [];
  tenant: any = {};
  rating_total: number = 0;
  rating_count: number = 0;
  request_code: string = '';
  apartmentsEquipment: any = {};
  apartmentsContract: any = {};
  apartmentsCheckRules: any = {};
  currentImage: string = '../../../assets/images/apartmentImages/default_apartment.jpg';
  noAllbed:any;
  bedsPrice=0;
  bedAvailable=0;
  getApartmentDetails() {
    this.subscriptions.push(
      this.apartmentService.getApartDetail(this.apt_UUID).subscribe(
        (res) => {
          console.log(res)
          this.allResponse=res;
          this.aprt = res.apartment_Basic_Info || {};


          this.aprt_Imgs = this.aprt.apartment_Images || [];
          this.trasponrts = this.aprt.apartment_Transports || [];
          this.rent_Rules = res.apartment_Check_Rules?.apt_rules || [];
          this.features = res.apartment_Equipments?.apartment_Features || [];
          this.facilities = res.apartment_Equipments?.apartment_Facilites || [];
          this.contract_Main = res.apartment_Contract || {};
          this.bath_Room = res.apartment_Equipments?.bathroom_Details || [];
          this.backup_Info = res.apartment_Backup_Info || {};
          this.owner_contract_file_name = res.file_Name;
          this.tenant_contract_file_name = res.tenant?.file_Name || '';
          this.center = {
            lat: this.aprt.apartment_Lat || 0,
            lng: this.aprt.apartment_Long || 0,
          };
          this.kitchen_Tools = res.apartment_Equipments?.kitchen_Details || [];
          this.tenant = res.tenant || {};
          this.rating_total = res.rating_Total;
          this.rating_count = res.rating_Count;
          this.request_code = res.request_Code;
          this.transform(this.aprt.apartment_VideoLink || '');

          this.apartmentsEquipment = res.apartment_Equipments || {};
          this.apartmentsContract = res.apartment_Contract || {};
          this.apartmentsCheckRules = res.apartment_Check_Rules || {};
          if (this.aprt.apartment_Description) {
            this.truncatedDescription = this.getTruncatedDescription(this.aprt.apartment_Description, 100);
          }
          this.visibleTransports = this.aprt.apartment_Transports.slice(0, 1);
          this.currentImage = this.aprt_Imgs[0].includes('https') ? this.aprt_Imgs[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
          if (Array.isArray(this.aprt.apartment_Rooms)) {
            let bedno = 0;
            let nobedAvailable=0

            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {


              // if (!this.aprt.apartment_Rooms[i].room_Type.includes('Shared Area')) {

              //   this.roomsBedRoom.push(this.aprt.apartment_Rooms[i]);
              //   for (let x = 0; x < this.roomsBedRoom[i].room_Beds.length; x++) {
              //     bedno++;

              //     this.roomsBedRoom[i].room_Beds[x] = { ...this.roomsBedRoom[i].room_Beds[x], "bed_number": bedno };

              //   }
              // } else {

                for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
                  bedno++;
                  if(this.aprt.apartment_Rooms[i].room_Beds[x].bed_Available){
                    nobedAvailable++;
                  }
                  // this.aprt.apartment_Rooms[i].room_Beds[x] = { ...this.aprt.apartment_Rooms[i].room_Beds[x], "bed_number": bedno };
                }
                // this.roomsLiving.push(this.aprt.apartment_Rooms[i]);

            }
            this.noAllbed=bedno;
            this.bedAvailable=nobedAvailable;


          if (this.aprt && this.aprt.apartment_Rooms) {
            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {

                  this.bedsPrice += this.aprt.apartment_Rooms[i].bed_Price * this.aprt.apartment_Rooms[i].beds_No || 0;

            }
          }


          } else {
            console.warn('apartment_Rooms is not an array:', this.aprt.apartment_Rooms);
          }



        },
        (error) => {
          console.error('Error fetching apartment details:', error);
        }
      )
    );
  }
  sanitizedVideoUrl: SafeResourceUrl | null = null;
  sanitized360DUrl: SafeResourceUrl | null = null;
  openVideo(videoURL: string) {
    this.sanitizedVideoUrl = this.transform(videoURL);
  }
  open360Video(videoURL: string) {
    this.sanitized360DUrl = this.transform(videoURL);
  }

  transform(videoURL: string) {
    let srclink = videoURL;
    if (srclink?.startsWith('https://www.youtube.com/watch?v=')) {
      let embedlink = srclink?.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else if (srclink?.startsWith('https://youtu.be')) {
      let embedlink = srclink?.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srclink);
    }
  }

  transform2(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  truncatedDescription: string = '';
  isFullDescription: boolean = false;
  getTruncatedDescription(text: string, wordLimit: number): string {
    const words = text.split(' ');
    // console.log(words)
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  toggleDescription(event: Event): void {
    event.preventDefault();
    this.isFullDescription = true;
  }


  showAllTransports: boolean = false;
  visibleTransports: any[] = [];
  showMore(event: Event): void {
    event.preventDefault();
    this.showAllTransports = true;
    this.visibleTransports = this.aprt.apartment_Transports;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkViewportWidth();
  }

  checkViewportWidth(): void {
    const vw = window.innerWidth;

    if (vw <= 950) {
       this.isVisible=true;


    }
  }

showimages:boolean=false;
currentIndex: number = 0;

openModal(): void {
  this.showimages = true;
  console.log(this.showimages);
}

closeModal(): void {
  this.showimages = false;
}
nextImage(): void {
  this.currentIndex = (this.currentIndex + 1) % this.aprt_Imgs.length;
}

prevImage(): void {
  this.currentIndex = (this.currentIndex - 1 + this.aprt_Imgs.length) % this.aprt_Imgs.length;
}






passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  if (!password) {
    return null;
  }


  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
  return valid ? null : { 'weakPassword': true };
}


onLoginSubmit(): void {
  console.log(this.loginForm)
    let mobileAPI='';
    let pass=this.loginForm.value.password;

    if (this.loginForm.valid) {

      if(this.loginForm.value.mobile===''){
        mobileAPI=this.loginForm.value.email;
      }else{
        mobileAPI=this.loginForm.value.mobile;
      }

      console.log('Sending user data to API:',this.loginForm.value.mobile,this.loginForm.value.email );
      this.userService.loginUser(mobileAPI,pass).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
          console.log('User account created successfully', response);

        this.openModalbooking()


        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error('Error creating user account', error);

        }
      );
    } else {
      console.error('Form is invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
      this.loginForm.markAllAsTouched();

  }
}
}
