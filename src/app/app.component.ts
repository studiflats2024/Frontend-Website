
import { Component, OnInit,Renderer2, AfterViewInit, ChangeDetectorRef,OnChanges, SimpleChanges, } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService,UserAccount } from './services/user.service';
import {  MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Globals, isValidEmail } from '../app/globals/global';
import { ApartmentSearchService } from './services/apartment-search.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

declare var intlTelInput: any;
declare var intlTelInputUtils: any;
import { lastValueFrom } from 'rxjs';
interface Country {
  name: {
    common: string;
  };
  cca2: string;
  flags: {
    svg: string;
  };
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('toggleSearch', [
      state('true', style({
        height: '*',
        opacity: 1,
      })),
      state('false', style({
        height: '0px',
        opacity: 0,
        display: 'none',
      })),
      transition('false => true', [
        animate('0.5s ease')
      ]),
      transition('true => false', [
        animate('0.5s ease')
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit  {

  signupForm!: FormGroup;
  forgetForm!: FormGroup;
  finishSignupForm!: FormGroup;
  countries: { name: string; code: string; flag: string }[] = [];
  selectedCountry: any;
  isLoggedIn:any;

  constructor(private router: Router,private authService: AuthService,private renderer: Renderer2,private fb: FormBuilder, private userService: UserService,  private messageService: MessageService,  private http: HttpClient, private cdr: ChangeDetectorRef,private apartmentSearchService: ApartmentSearchService) {}
  passwordFieldType: string = 'password'; // This controls the input type
  passwordFieldTypee: string = 'password';
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  togglePasswordVisibilityconfirm(): void {
    this.passwordFieldTypee = this.passwordFieldTypee === 'password' ? 'text' : 'password';
  }
  // onLoginMethodChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.loginMethod = inputElement.value;
  //   console.log('Login method changed to:', this.loginMethod);

  //   if (this.loginMethod === 'whatsApp') {
  //     console.log('Login method changed to:', this.loginMethod);
  //     setTimeout(() => {
  //       const input = document.querySelector("#phonee") as HTMLInputElement;
  //       if (input && !input.dataset['itiInitialized']) {
  //         console.log('Initializing intlTelInput');
  //         const iti = intlTelInput(input, {
  //           initialCountry: "de",
  //           preferredCountries: ["de", "us", "gb"],
  //           separateDialCode: true,
  //           utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  //         });
  //         input.dataset['itiInitialized'] = 'true';
  //       }
  //     }, 1000);
  //   }
  // }
  // ngAfterViewChecked() {


  //   if (this.loginMethod === 'whatsApp') {
  //     const input = document.querySelector("#phonee") as HTMLInputElement;

  //     if (input && !input.dataset['itiInitialized']) {
  //       console.log('Phone input element found:', input);


  //       const iti = intlTelInput(input, {
  //         initialCountry: "de",
  //         preferredCountries: ["de", "us", "gb"],
  //         separateDialCode: true,
  //         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  //       });

  //       input.dataset['itiInitialized'] = 'true';



  ngAfterViewChecked() {

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
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          useFullscreenPopup: false
        });




        // Mark the element as initialized
        input.dataset['itiInitialized'] = 'true';

        // Handle the blur event to save the phone number
        input.addEventListener('blur', () => {
          let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
          if (fullPhoneNumber.startsWith("+")) {
            fullPhoneNumber = fullPhoneNumber.substring(1); // Remove the "+"
          }
          console.log("Full phone number:", fullPhoneNumber);
          this.loginForm.patchValue({ mobile: fullPhoneNumber });
          console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
        });

        input.addEventListener("countrychange", function() {


           // Clear the previous flag and dial code
    const flagContainer = document.querySelector(".iti__selected-flag");
    const dialCodeElement = document.querySelector(".iti__dial-code");
    console.log(flagContainer,dialCodeElement)

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
      }
    }


  }



  // ngOnChanges(changes: SimpleChanges) {



  //   const input = document.querySelector("#phone");

  //   if (input) {
  //     const iti = intlTelInput(input, {
  //       initialCountry: "de",
  //       preferredCountries: ["de", "us", "gb"],
  //       separateDialCode: true,
  //       utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  //     });


  //     input.addEventListener('blur', () => {
  //       let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
  //       if (fullPhoneNumber.startsWith("+")) {
  //         fullPhoneNumber = fullPhoneNumber.substring(1);
  //       }
  //       console.log("Full phone number:", fullPhoneNumber);
  //       this.loginForm.patchValue({ mobile: fullPhoneNumber });
  //       console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
  //        console.log(typeof( this.loginForm.value.mobile))
  //     });
  //   } else {
  //     console.error("The phone input element was not found.");
  //   }
  // }
  ngOnInit(): void {

    this.userService.modalVisibility$.subscribe(show => {
      // this.displayModalsign = show ? 'block' : 'none';
      this.isVisiblelogin = show ? 'block' : 'none';

    });


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
      this.forgetForm=this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });

      // const inputlogin = document.querySelector("#phonee");

      // if (inputlogin) {
      //   const iti = intlTelInput(inputlogin, {
      //     initialCountry: "de",
      //     preferredCountries: ["de", "us", "gb"],
      //     separateDialCode: true,
      //     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      //   });


      //   inputlogin.addEventListener('blur', () => {
      //     let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
      //     if (fullPhoneNumber.startsWith("+")) {
      //       fullPhoneNumber = fullPhoneNumber.substring(1);
      //     }
      //     console.log("Full phone number:", fullPhoneNumber);
      //     this.loginForm.patchValue({ mobile: fullPhoneNumber });
      //     console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
      //      console.log(typeof( this.loginForm.value.mobile))
      //   });
      // } else {
      //   console.error("The phone input element was not found.");
      // }

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
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          useFullscreenPopup: false  // تحميل سكربت الأدوات المساعدة
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
          let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);  // الحصول على الرقم بتنسيق E164
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
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],

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

  ngAfterViewInit(): void {

//     const inputlogin = document.querySelector("#phonee") as HTMLInputElement;

//     if (inputlogin) {
//       const iti = intlTelInput(inputlogin, {
//         initialCountry: "de",
//         preferredCountries: ["de", "us", "gb"],
//         separateDialCode: true,
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" ,
//         useFullscreenPopup: false
//       });
//       inputlogin.addEventListener("countrychange", function() {

//  const flagContainer = document.querySelector(".iti__selected-flag");
//  const dialCodeElement = document.querySelector(".iti__dial-code");


//  if (flagContainer) {
//      flagContainer.classList.remove("iti__selected-flag");
//  }
//  if (dialCodeElement) {
//      dialCodeElement.textContent = '';
//  }


//  const selectedCountryData = iti.getSelectedCountryData();


//  if (flagContainer) {
//      flagContainer.classList.add("iti__selected-flag");
//      dialCodeElement!.textContent = "+" + selectedCountryData.dialCode;
//  }


//  console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
//     });


//       inputlogin.addEventListener('blur', () => {
//         let fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
//         if (fullPhoneNumber.startsWith("+")) {
//           fullPhoneNumber = fullPhoneNumber.substring(1);
//         }
//         console.log("Full phone number:", fullPhoneNumber);
//         this.loginForm.patchValue({ mobile: fullPhoneNumber });
//         console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
//          console.log(typeof( this.loginForm.value.mobile))
//       });
//     } else {
//       console.error("The phone input element was not found.");
//     }

    this.loginForm.reset();









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
   this.hideLogin();
}
onCloseSignModal() {
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

if(mobileAPI===null){
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'you must write your phone' });

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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message,life: 500 });
      console.error('Error sending OTP', error);
      // Handle error, e.g., show an error message to the user
    }
  );
}
}
displayInfo:any;
openInfoModal(){
  this.displayInfo='block';
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
      this.router.navigate(['/']);
      // Handle successful logout (e.g., redirect to login page)
    },
    error => {
      console.error('Logout failed', error);
      localStorage.removeItem('token');
      // Handle logout error
    }
  );





}

isAuthenticated(): boolean {

  return !!localStorage.getItem('token');
}

onForgetSubmit(): void {
  const password = this.forgetForm.get('password')?.value;
  const confirmPassword = this.forgetForm.get('confirmPassword')?.value;


  this.userService.resetPassword(password, confirmPassword, this.uuidforgot, this.resetToken).subscribe(
    response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
      console.log('Password reset successfully', response);
      this.displayForgetPass='none';
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

emailGoogle:boolean=false;
onFinishSignSubmit() {
  if (this.finishSignupForm.valid) {
    const formData = this.finishSignupForm.value;
    const genderName = formData.gender.name;
    // formData.email=
    this.userService.sendUserData(
      formData.email,
      genderName,
      formData.country,
      formData.birthday,
      this.uuid,
      formData.mobile,
      'Local'
    ).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('Form Submitted Successfully:', response);
        this.displayInfo='none';
        if(this.socialSign===false){
          setTimeout(() => {

            this.isVisiblelogin='block';

          },  3000);
        }


      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error submitting form:', error);

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
  }
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
          this.getProfileData(response.token);


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
          if(error.error.message==="Oops!! Your Profile isn't completed yet , Please complete it"){
             this.displayInfo='block';
             this.isVisiblelogin='none';
          }

        }
      );
    } else {
      console.error('Form is invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
      this.loginForm.markAllAsTouched();

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

  signInWithGoogle(): void {
    this.socialSign=true;
    // const token = localStorage.getItem('token');
    // if (token) {
    //   console.error('Token not found, redirecting to login');
    //   this.logout();
    //   this.userService.signInWithGoogle();
    // }else{
    //   this.userService.signInWithGoogle();
    // }this.socialSign=true;
    if(!localStorage.getItem('token')){
      this.userService.signInWithGoogle();

       setTimeout(() => {
        this.userService.uuid.subscribe(value => {
          this.uuid = value;
          console.log('Component1 received shared data:', this.uuid);
        });

       if(!localStorage.getItem('token')){
        this.displayInfo='block';

      }else{
        this.isVisiblelogin='none';
      }

      }, 500);
    }else{
      this.userService.signInWithGoogle();
    }


  }
socialSign:boolean=false;
   signUpWithGoogle(): void {

    console.log('sign up')
    this.userService.signInWithGoogle();
    setTimeout(() => {
      if(!localStorage.getItem('token')){
        this.displayInfo='block';

      }else{
        this.displayModalsign='none';
      }

    }, 0);

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
