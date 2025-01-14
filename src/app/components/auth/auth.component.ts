import { Component, OnInit,Renderer2, AfterViewInit, ChangeDetectorRef,OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService,UserAccount } from '../../services/user.service';
import {  MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Globals, isValidEmail } from '../../globals/global';
import { ApartmentSearchService } from '../../services/apartment-search.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApplicationRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GoogleAuthService } from '../../services/google-auth.service';


declare var intlTelInput: any;

@Component({
  selector: 'app-auth',
  
 
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  @Output() onClose = new EventEmitter<void>();
  isVisible :any;

  login() {
   
    this.isVisible = false;
  }

  close() {
    this.isVisible = false;
    this.onClose.emit();
  }

  show() {
    this.isVisiblelogin = 'block';
  }

  /////////////////////////////////////////
  signupForm!: FormGroup;
  forgetForm!: FormGroup;
  finishSignupForm!: FormGroup;
  countries: { name: string; code: string; flag: string }[] = [];
  selectedCountry: any;
  isLoggedIn:any;

  constructor(private googleAuthService:GoogleAuthService,private appRef: ApplicationRef,private router: Router,private authService: AuthService,private renderer: Renderer2,private fb: FormBuilder, private userService: UserService,  private messageService: MessageService,  private http: HttpClient, private cdr: ChangeDetectorRef,private apartmentSearchService: ApartmentSearchService) {}
  passwordFieldType: string = 'password'; // This controls the input type
  passwordFieldTypee: string = 'password';
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onGoogleSignIn() {
    this.googleAuthService.promptSignIn();
    this.socialSign=true;
  }

  // onGoogleSignIn(): void {
  //   this.googleAuthService
  //     .signIn()
  //     .then((userData) => {
  //       console.log('Google Sign-In successful:', userData);
      
  //     })
  //     .catch((error) => {
  //       if (error.error === 'popup_closed_by_user') {
  //         console.warn('Google Sign-In was canceled by the user.');
  //         this.messageService.add({
  //           severity: 'warn',
  //           summary: 'Canceled',
  //           detail: 'Google Sign-In was canceled.',
  //         });
  //       } else {
  //         console.error('Google Sign-In failed:', error);
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Google Sign-In failed. Please try again.',
  //         });
  //       }
  //     });
  // }

  


  togglePasswordVisibilityconfirm(): void {
    this.passwordFieldTypee = this.passwordFieldTypee === 'password' ? 'text' : 'password';
  }

  init:boolean=true;
  ngAfterViewChecked() {
    // this.resetFormLogin()
    // this.resetFormSign()
//  this.initPhoneSocial()

    if (this.loginMethod === 'whatsApp') {
      const input = document.querySelector("#phonee") as HTMLInputElement;

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
          this.loginForm.patchValue({ mobile: fullPhoneNumber });
          console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
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
    this.isStableSubscription = this.appRef.isStable.subscribe((isStable) => {
      if (this.init) {
       setTimeout(() => {
        console.log('App is stable, executing logic...');
        this.resetFormLogin();
        this.resetFormSign();

        // Unsubscribe to prevent further triggers
        this.isStableSubscription.unsubscribe();
        this.init=false
       }, 0);
      }
    });

 

  }


  resetFormLogin() {
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['mobile'].setValue('');
    this.loginForm.controls['password'].setValue('');

    const phoneInput = (<HTMLInputElement>document.getElementById('phonee'));
    if (phoneInput) {
      phoneInput.value = ''; // Clear the input manually
    }
    // this.loginForm.markAsPristine();
    // this.loginForm.markAsUntouched();
    this.loginForm.updateValueAndValidity();
    console.log(this.loginForm)
  }

  resetFormSign() {
    this.signupForm.controls['fullName'].setValue('');
    this.signupForm.controls['mobile'].setValue('');
    this.signupForm.controls['password'].setValue('');
    this.signupForm.controls['confirmPassword'].setValue('');

    this.signupForm.markAsUntouched();
   
    this.signupForm.updateValueAndValidity();
    console.log(this.signupForm)
  }
  private isStableSubscription!: Subscription;

  ngOnInit(): void {
  this.socialSign=false
    // this.loginForm.reset();
    //////////////////////open complete profile//////////////////////////////////
    this.userService.getModalState().subscribe((state: string) => {
      // this.displayVerify = state;
      this.displayInfo = state;  

      console.log('state',state)
      if(state==='block'){
        this.openInfoModal()
        this. isVisiblelogin='none';
        this. displayModalsign='none'
      }else if(state==='none'&&(this.isVisiblelogin==='block'||this.displayModalsign==='block')){
        this. isVisiblelogin='none';
        this. displayModalsign='none';
        
        this.displayForgetPass='none';
        Globals.authg=false;
      }
    });
    //////////////////////open complete profile//////////////////////////////////
    ///////////////////////////////////////////share uuid from social////////////////////////////
    this.userService.uuidData$.subscribe((data) => {
      this.uuid = data;
      console.log('Received shared data:', data);
      // this.socialSign=true;
    });
    ////////////////////////////////////////////////////////////////////////////////////////
     

    this.userService.modalVisibility$.subscribe(show => {
     
      console.log('hello auth')
      this.isVisiblelogin = show ? 'block' : 'none';
      console.log('hello auth')

    });

    this.isVisiblelogin = 'block' ;
    




    this.userService.initGoogleAuth();

    this.loginMethod='whatsApp';

    this.isLoggedIn = this.isAuthenticated();
    this.options=[  { name: 'Male', code: 'NY' },
      { name: 'Female', code: 'RM' } ];

      this.loginForm = this.fb.group({
        mobile: '',

        email: '',
        password: [''],

      } );
      /////////////reset login////////////
      this.resetFormLogin()
       
      /////////////reset login////////////

      
      this.forgetForm=this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });

 

      this.signupForm = this.fb.group({
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
        fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        // email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });




      const input = document.querySelector("#phone") as HTMLInputElement;

      if (input) {
        const iti = intlTelInput(input, {
          initialCountry: "de",  // الدولة الافتراضية
          preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
          separateDialCode: true,  // فصل كود الدولة
          // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
           searchCountry:true,
          useFullscreenPopup: false , // تحميل سكربت الأدوات المساعدة

        });

        input.addEventListener("countrychange", function() {
        // Clear the previous flag and dial code
    const flagContainer = document.querySelector(".iti__selected-flag");
    const dialCodeElement = document.querySelector(".iti__dial-code");

    // Remove previous flag and code visually
    if (flagContainer) {
        flagContainer.classList.remove("iti__selected-flag");
    }
    if (dialCodeElement) {
        dialCodeElement.textContent = ''; // Clear the dial code
    }

    // Get the new country data and update the flag and code
    const selectedCountryData = iti.getSelectedCountryData();

    // Reapply the new flag and dial code
    if (flagContainer) {
        flagContainer.classList.add("iti__selected-flag"); // Re-add flag class
        dialCodeElement!.textContent = "+" + selectedCountryData.dialCode; // Set the new dial code
    }

    // Optional: Log the new selected country and dial code
    console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
      });

        // حدث عند فقدان التركيز على الحقل
        input.addEventListener('blur', () => {
          // let fullPhoneNumber = iti.getNumber(iti.numberFormat.E164);
          let fullPhoneNumber = iti.getNumber();

          if (fullPhoneNumber.startsWith("+")) {
            fullPhoneNumber = fullPhoneNumber.substring(1);  // إزالة رمز "+"
          }
          console.log("Full phone number:", fullPhoneNumber);
          this.signupForm.patchValue({ mobile: fullPhoneNumber });
          console.log("Updated mobile field in the form:", this.signupForm.value.mobile);
           console.log(typeof( this.signupForm.value.mobile))
        });

      } else {
        console.error("The phone input element was not found.");
      }






      this.finishSignupForm = this.fb.group({
        country: ['', Validators.required],
        // email: ['', [Validators.required, Validators.email]],
        email: [''],

        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        mobile:['']
      });
      this.http.get<any>('https://restcountries.com/v3.1/all').subscribe((data) => {
        console.log(data);
        this.countries = data.map((country:any) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg
        }));
      });


  }
  signOut() {
    this.googleAuthService.signOut();
  }

  ngAfterViewInit(): void {

    // this.googleAuthService.renderButton('google-signin-button');///////////////////////////////////////////////

    // const inputs = document.querySelectorAll('input');
    // inputs.forEach((input) => {
    //   (input as HTMLInputElement).value = ''; 
    // });
 
    this.resetFormLogin();
    this.resetFormSign();
   setTimeout(() => {
    this.resetFormLogin()
    this.resetFormSign()
   },1000 );

 

  
  }




  title = 'StudiFlats';
  message: any = null;
  value: string = '';
  options:any;
  selectedOption:string='';
  birthday:any;



  searchVisible: boolean = false;

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    const searchElement = this.renderer.selectRootElement('#search', true);
    if (this.searchVisible) {
      this.renderer.appendChild(document.body, searchElement);
    } else {
      this.renderer.removeChild(document.body, searchElement);
    }
  }

  activeIndex: number = 0;

onStepChange(event: any) {
 this.activeIndex = event.index;
}
showBooking:boolean=true;

onsubmitLogin(){
this.showBooking=true;
}

displayModalsign:any;
openModalSign(){

   this.displayModalsign='block';
  //  this.hideLogin();
  this.isVisiblelogin = 'none';
  this.displayForgetPass='none';
}
onCloseSignModal() {
  Globals.authg=false;
  this.displayModalsign='none';
  this.displayInfo='none';
  this.displayVerify='none';
  this.displayVerifyForget='none';
  this.userService.closeModal();
}
displayVerify:any
isOtpValid:boolean=false;
uuidforgot:any;
resetToken:any;

openverifyModal(){


let mobileAPI=null;

  mobileAPI=this.loginForm.value.mobile;
  console.log(mobileAPI)

if(mobileAPI===null||mobileAPI===''){
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'you must write your phone',life: 5000 });

}else{



  this.userService.sendForgotPasswordOtp(mobileAPI).subscribe(
    response => {
      // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
      console.log('OTP sent successfully', response);
      this.uuidforgot=response.uuid;
      this.resetToken=response.reset_Token;
      localStorage.setItem('token', response.reset_Token);
      this.displayModalsign='none';
       this.isVisiblelogin = 'none';

        this.displayVerifyForget='block'

    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message,life: 5000 });
      console.error('Error sending OTP', error);
      // Handle error, e.g., show an error message to the user
    }
  );
}
}
displayInfo:any;
openInfoModal(){
  this.displayInfo='block';
  this.initPhoneSocial()
}
initPhoneSocial(){
 // Select the input field by its ID
 const phoneInput = document.getElementById('socialPhone') as HTMLInputElement;

 if (phoneInput) {
   // Initialize intl-tel-input
   const iti = (window as any).intlTelInput(phoneInput, {
     initialCountry: 'de', // Default country
     separateDialCode: true,
     preferredCountries: ['us', 'gb', 'de'], // Preferred countries
     utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js', // Utilities script
   });

   // Example: Handle `blur` event to get the phone number in international format
   phoneInput.addEventListener('blur', () => {
     let phoneNumber = iti.getNumber(); // Get the phone number with the country code
     console.log('Formatted Phone Number:', phoneNumber);
     if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.slice(1);  
    }
     this.mobileSocial=phoneNumber
   });
     phoneInput.addEventListener("countrychange", function() {
     
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


   };
}
displayForgetPass:any;

openForgetModal(){

    this.userService.checkOtp(this.otp, this.uuidforgot).subscribe(
      response => {
        // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('OTP verified successfully', response);
        this.displayForgetPass='block';
        this.displayVerifyForget='none'
         this.isVisiblelogin = 'none';
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error verifying OTP', error);

      }
    );


}
displayVerifyForget:any;

openChangeModal(){
  this.displayForgetPass='block';
  this.displayVerifyForget='none'
  this.isVisiblelogin = 'none';
}




passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { 'mismatch': true };
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




logout(): void {


  // const deviceToken = 'your_device_token_here'; // Replace with the actual device token
  this.userService.logout().subscribe(
    response => {

      console.log('Logout successful', response);
      localStorage.removeItem('token');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');


      this.router.navigate(['/']);
      // Handle successful logout (e.g., redirect to login page)
    },
    error => {
      console.error('Logout failed', error);
      // localStorage.removeItem('token');
      // localStorage.removeItem('userToken');
      // localStorage.removeItem('userName');
      // Handle logout error
    }
  );





}

// isAuthenticated(): boolean {

//   return !!localStorage.getItem('token');
// }

isAuthenticated(): boolean {
  const userToken = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  return !!userToken && !!userName && !!token;
}


onForgetSubmit(): void {
  const password = this.forgetForm.get('password')?.value;
  const confirmPassword = this.forgetForm.get('confirmPassword')?.value;


  this.userService.resetPassword(password, confirmPassword, this.uuidforgot, this.resetToken).subscribe(
    response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
      console.log('Password reset successfully', response);
      this.displayForgetPass='none';
      this.isVisiblelogin='block'
      // Handle success, e.g., navigate to a login page or show a success message
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      console.error('Error resetting password', error);
      // Handle error, e.g., show an error message to the user
    }
  );
}


onSubmit(): void {
console.log(this.signupForm)

  // if (this.signupForm.valid) {


    const userAccount = {
      mobile: this.signupForm.value.mobile,
      fullName: this.signupForm.value.fullName,
      password: this.signupForm.value.password,
      confirm_Password: this.signupForm.value.confirmPassword
    };
    Globals.name = userAccount.fullName;
    localStorage.setItem('name', Globals.name);

    // Determine whether the mobile input is an email or phone number
    if (isValidEmail(userAccount.mobile)) {
      Globals.email = userAccount.mobile;
      localStorage.setItem('email', Globals.email);
    } else {
      Globals.phone = userAccount.mobile;
      localStorage.setItem('phone', Globals.phone);
    }

    console.log('Sending user data to API:', userAccount);
    this.userService.createUser(userAccount).subscribe(
      response => {
        // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('User account created successfully', response);
        // this.openverifyModal();
        this.displayVerify='block';
        this.uuid=response.uuid;



      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error creating user account', error);

      }
    );
  // } else {
  //   console.error('Form is invalid');
  //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
  //   this.signupForm.markAllAsTouched();
  // }
}


uuid:string='';
reuuid:string='';
otp:string='';
onVerifyOtp(): void {
  this.userService.checkOtp(this.otp, this.uuid).subscribe(
    response => {
      // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
      console.log('OTP verified successfully', response);
      this.displayModalsign='none';
      this.displayVerify='none';
     if(this.updatedPhone){
       this.isVisiblelogin='block'
      return;
     }
     if(this.socialSign){
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Congratulations!', 
        detail: "You have successfully signed up! Welcome aboard!" 
      });
        
      setTimeout(() => {

        this.isVisiblelogin='block';

      },  3000);
    
      this.socialSign=false;
      return;
    }
      this.openInfoModal()

    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      console.error('Error verifying OTP', error);

    }
  );
}
refreshOtp(): void {

  this.userService.refreshOtp(this.uuidforgot).subscribe(
    (response) => {
      console.log('OTP refreshed successfully:', response);
    },
    (error) => {
      console.error('Error refreshing OTP:', error);
    }
  );
}



convertToISO(dateString: any): string {
  console.log('Input Date String:', dateString);

  // التحقق إذا كان dateString من نوع Date مباشرة
  if (dateString instanceof Date) {
    console.log('Date object detected, converting to ISO:', dateString);

     // ضبط التوقيت المحلي
  const localDate = new Date(dateString.getTime() - dateString.getTimezoneOffset() * 60000);
  console.log('Adjusted Local Date:', localDate.toISOString());
  return localDate.toISOString();

    // console.log( dateString.toISOString())
    // return dateString.toISOString();
  }

  

 
  

  // تحويل التاريخ إلى نص إذا لم يكن نصًا بالفعل
  if (typeof dateString !== 'string') {
    console.warn('Converting non-string input to string:', dateString);
    dateString = String(dateString);
  }

  // التحقق إذا كان التاريخ بصيغة MM/DD/YYYY
  const dateRegex = /^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
  if (dateRegex.test(dateString)) {
    console.log('Valid GMT Date String detected:', dateString);
    const date = new Date(dateString);
    
    date.setUTCHours(9, 15, 1, 356);
    // date.setUTCHours(0, 0, 0, 0);
    console.log(date.toISOString())

    return date.toISOString();

      // ضبط التوقيت المحلي
// const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
// console.log('Adjusted Local Date:', localDate.toISOString());
// return localDate.toISOString();

  }

  // تقسيم التاريخ بصيغة MM/DD/YYYY
  const [month, day, year] = dateString.split('/').map(Number);

  // التحقق من القيم المدخلة
  if (!day || !month || !year) {
    console.error('Invalid date format:', dateString);
    return '';
  }

  // إنشاء التاريخ وضبط التوقيت إلى 09:15:01.356 UTC
  const date = new Date(Date.UTC(year, month - 1, day, 9, 15, 1, 356));
  console.log('Created Date Object (UTC):', date.toUTCString());

  // إرجاع التاريخ بصيغة ISO
  const isoDate = date.toISOString();
  console.log('ISO Converted Date:', isoDate);
  return isoDate;
}
convertToMMDDYYYY(date: string | Date): string {
  const parsedDate = new Date(date);

  // استخراج الشهر، اليوم، والسنة
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // الأشهر تبدأ من 0، لذا نضيف 1
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const year = parsedDate.getFullYear();

  // إرجاع التاريخ في الصيغة المطلوبة MM/DD/YYYY
  return `${month}/${day}/${year}`;
}

emailGoogle:boolean=false;
provider:any;
mobileSocial:any='';
onFinishSignSubmit() {
  console.log(this.finishSignupForm.get('country')?.value)
  const birthdayValue = this.finishSignupForm.get('birthday')?.value;

  // Convert the birthday to ISO format if it exists
  if (birthdayValue) {
    const isoBirthday = this.convertToMMDDYYYY(birthdayValue);
    console.log(birthdayValue,isoBirthday)
    this.finishSignupForm.patchValue({
      birthday: isoBirthday,
    });
  }
  if (this.finishSignupForm.valid) {
    const formData = this.finishSignupForm.value;
    const genderName = formData.gender.name;

    // formData.email=
    this.provider='Local';
    if(this.socialSign){
      this.provider='Google';

    }
    this.userService.sendUserData(
      formData.email,
      genderName,
      formData.country.name,
      formData.birthday,
      this.uuid,
      this.mobileSocial,
      this.provider
    ).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('Form Submitted Successfully:', response);
        this.displayInfo='none';
        // if(this.socialSign===false){
        //   setTimeout(() => {

        //     this.isVisiblelogin='block';

        //   },  3000);
        // }
        if(this.socialSign){
          this.displayVerify='block';
          return;
        }

           setTimeout(() => {

            this.isVisiblelogin='block';

          },  3000);
        
          // this.socialSign=false;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error submitting form:', error);
        // this.socialSign=false;

      }
    );
  } else {
    console.error(this.finishSignupForm);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
    this.finishSignupForm.markAllAsTouched();
  }
}



isVisiblelogin='none';
loginMethod: string = 'whatsApp';
  loginForm!: FormGroup;
  showLogin(): void {




    if (!this.isAuthenticated()) {

      this.isVisiblelogin = 'block';

      this.displayModalsign='none';

    this.displayInfo='none';
    this.displayVerify='none'
    this.displayVerifyForget='none'

    }else{
      this.logout();
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'you logged out successfully' });


    }





  }



  hideLogin(): void {
    this.isVisiblelogin = 'none';
    this.displayForgetPass='none';
    Globals.authg=false;
  }
  updatedPhone:boolean=false;
onLoginSubmit(): void {
  console.log(this.loginForm)
    let mobileAPI='';
    let pass=this.loginForm.value.password;
    console.log(this.loginForm.value)

    if (this.loginForm.valid) {

      // if(this.loginForm.value.mobile===null){
      //   mobileAPI=this.loginForm.value.email;
      // }else if(this.loginForm.value.email===null){
      //   mobileAPI=this.loginForm.value.mobile;
      // }
      if(this.loginMethod==='email'){
        mobileAPI=this.loginForm.value.email;
      }else if(this.loginMethod==='whatsApp'){
        mobileAPI=this.loginForm.value.mobile;
      }

      console.log('Sending user data to API:',this.loginForm.value.mobile,this.loginForm.value.email );
      this.userService.loginUser(mobileAPI,pass).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
          console.log('User account created successfully', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.getProfileData(response.token);

          this.authService.notifyLoginStatus(true);

        //  let namelogin:any= localStorage.getItem('name');

        //   let emaillogin:any=  localStorage.getItem('email');

        //     let phonelogin:any =localStorage.getItem('phone');

        //     localStorage.setItem('namelogin', namelogin);
        //     localStorage.setItem('emaillogin',emaillogin);
        //     localStorage.setItem('phonelogin', phonelogin);


         this.hideLogin();


        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error('Error creating user account', error);
          console.error('Error creating user account', error.error);

          if(error.error.profileCompleted===false&&error.error.account_Confirmed===false){
            //  this.displayInfo='block';
              this.displayVerify='block';

             this.isVisiblelogin='none';
             this.uuid=error.error.uuid;
          }else if(error.error.profileCompleted===false&&error.error.account_Confirmed===true){
                this.displayInfo='block';
              //  this.displayVerify='block';

               this.isVisiblelogin='none';
               this.uuid=error.error.uuid;
          }else if(error.error.profileCompleted===true&&error.error.account_Confirmed===false){
            this.displayVerify='block';

            this.isVisiblelogin='none';
            this.uuid=error.error.uuid;
            this.updatedPhone=true;
          }

        }
      );
    } else {
      console.error('Form is invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
      this.loginForm.markAllAsTouched();
      // this.loginForm.reset();

  }
}


profileData: any;
getProfileData(token:any): void {
  this.userService.getProfile().subscribe(
    data => {
      this.profileData = data;
      console.log('ProfileData :',this.profileData);
      this.userName= this.profileData[0]?.fullName;
      // this.emaillogin=this.profileData[0]?.email;rr
      // this.phonelogin=this.profileData[0]?.mobile;
      this.authService.login(this.userName, token);
    },
    error => {
      console.error('There was an error!', error);
    }
  );
}
     userName:any;



/////////////////////////////////////////
//social sign/////////////////////
input:any=null;
initMobileSocial(){
  console.log('heeeee')
  const input = document.querySelector("#socialPhone") as HTMLInputElement;
  this.input=input;
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
      this.mobileSocial=fullPhoneNumber;
      console.log("Updated mobile field in the form:",this.mobileSocial);
    });}
}

  signInWithGoogle(): void {


    if(!localStorage.getItem('token')){
      this.userService.signInWithGoogle();
      this.socialSign=true;


       setTimeout(() => {


        this.initMobileSocial();

        this.userService.uuid.subscribe(value => {
          this.uuid = value;
          console.log('Component1 received shared data:', this.uuid);
        });
        this.userService.modalInfo$.subscribe(show => {
          console.log(show)
          // this.displayModalsign = show ? 'block' : 'none';
          if( this.input!==null){
            this.displayInfo = show ? 'block' : 'none';
          }
          if(this.displayInfo==='block'){
            this.isVisiblelogin='none';
           }


        });


        // if(this.mobileSocial!==null){
        //   this.displayInfo='block';
        //   this.isVisiblelogin='none';
        // }


      }, 500);
    }else{
      this.userService.signInWithGoogle();
    }


  }






socialSign:boolean=false;
   signUpWithGoogle(): void {

      this.socialSign=true;
    console.log('sign up')
    console.log(this.mobileSocial)
    this.userService.signInWithGoogle();
    setTimeout(() => {
      // if(!localStorage.getItem('token')){

      //   this.initMobileSocial();

      // }else{
      //   this.displayModalsign='none';
      // }

      this.userService.modalInfo$.subscribe(show => {


        if( this.input!==null){
          this.displayInfo = show ? 'block' : 'none';
        }
        if(this.displayInfo==='block'){
          this.displayModalsign='none';
         }
      });



    }, 500);

  }
  // async signUpWithGoogle(): Promise<void> {
  //   try {
  //     console.log('sign up');
  //     await this.userService.signInWithGoogle() ;
  //     console.log('sign up');

  //    this.logout();
  //   } catch (error) {
  //     console.error('An error occurred during sign-in:', error);

  //   }
  // }

}
