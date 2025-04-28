
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
export class AppComponent implements OnInit  {
  isHomePage(): boolean {
    return this.router.url === '/'; // أو '/home' لو الهوم عندك عليه روت اسمه كده
  }

  // signupForm!: FormGroup;
  // forgetForm!: FormGroup;
  // finishSignupForm!: FormGroup;
  // countries: { name: string; code: string; flag: string }[] = [];
  // selectedCountry: any;
  // isLoggedIn:any;

  constructor(private router: Router,private authService: AuthService,private renderer: Renderer2,private fb: FormBuilder, private userService: UserService,  private messageService: MessageService,  private http: HttpClient, private cdr: ChangeDetectorRef,private apartmentSearchService: ApartmentSearchService) {}
  // passwordFieldType: string = 'password';  
  // passwordFieldTypee: string = 'password';
  // togglePasswordVisibility(): void {
  //   this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  // }
  // togglePasswordVisibilityconfirm(): void {
  //   this.passwordFieldTypee = this.passwordFieldTypee === 'password' ? 'text' : 'password';
  // }
 



  // ngAfterViewChecked() {

  //   if (this.loginMethod === 'whatsApp') {
  //     const input = document.querySelector("#phonee") as HTMLInputElement;
 
  //     if (input && !input.dataset['itiInitialized']) {
  //       console.log('Phone input element found and initializing intlTelInput:', input);

 
  //       const iti = intlTelInput(input, {
  //         initialCountry: "de",
  //         preferredCountries: ["de", "us", "gb"],
  //         separateDialCode: true,
         
  //         utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
  //          searchCountry:true,
  //         useFullscreenPopup: false,

  //       });





  //       input.dataset['itiInitialized'] = 'true';
  //       console.log(input.dataset['itiInitialized'])


  //       input.addEventListener('blur', () => {
  //         let fullPhoneNumber = iti.getNumber();
  //         if (fullPhoneNumber.startsWith("+")) {
  //           fullPhoneNumber = fullPhoneNumber.substring(1);
  //         }
  //         console.log("Full phone number:", fullPhoneNumber);
  //         this.loginForm.patchValue({ mobile: fullPhoneNumber });
  //         console.log("Updated mobile field in the form:", this.loginForm.value.mobile);
  //       });



  //       input.addEventListener("countrychange", function() {



  //   const flagContainer = document.querySelector(".iti__selected-flag");
  //   const dialCodeElement = document.querySelector(".iti__dial-code");
  //   console.log(flagContainer,dialCodeElement)

  //   if (flagContainer) {
  //       flagContainer.classList.remove("iti__selected-flag");
  //   }
  //   if (dialCodeElement) {
  //       dialCodeElement.textContent = '';
  //   }


  //   const selectedCountryData = iti.getSelectedCountryData();


  //   if (flagContainer) {
  //       flagContainer.classList.add("iti__selected-flag");
  //       dialCodeElement!.textContent = "+" + selectedCountryData.dialCode;
  //   }

  //   console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);


  //     });
  //     }
  //   }


  // }



 

 
  ngOnInit(): void {

  

    // this.userService.modalVisibility$.subscribe(show => {
      
    //   this.isVisiblelogin = show ? 'block' : 'none';

    // });




    // this.userService.initGoogleAuth();

    // this.loginMethod='whatsApp';

    // this.isLoggedIn = this.isAuthenticated();
    // this.options=[  { name: 'Male', code: 'NY' },
    //   { name: 'Female', code: 'RM' } ];

    //   this.loginForm = this.fb.group({
    //     mobile: '',

    //     email: '',
    //     password: [''],

    //   } );
    //   this.forgetForm=this.fb.group({
    //     password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    //     confirmPassword: ['', Validators.required]
    //   }, { validator: this.passwordMatchValidator });

      

    //   this.signupForm = this.fb.group({
    //     mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    //     fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
         
    //     password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    //     confirmPassword: ['', Validators.required]
    //   }, { validator: this.passwordMatchValidator });




    //   const input = document.querySelector("#phone") as HTMLInputElement;

    //   if (input) {
    //     const iti = intlTelInput(input, {
    //       initialCountry: "de",   
    //       preferredCountries: ["de", "us", "gb"],  
    //       separateDialCode: true, 
 
    //       utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
    //        searchCountry:true,
    //       useFullscreenPopup: false , 

    //     });

    //     input.addEventListener("countrychange", function() {
   
    // const flagContainer = document.querySelector(".iti__selected-flag");
    // const dialCodeElement = document.querySelector(".iti__dial-code");

   
    // if (flagContainer) {
    //     flagContainer.classList.remove("iti__selected-flag");
    // }
    // if (dialCodeElement) {
    //     dialCodeElement.textContent = ''; 
    // }

    
    // const selectedCountryData = iti.getSelectedCountryData();

 
    // if (flagContainer) {
    //     flagContainer.classList.add("iti__selected-flag"); 
    //     dialCodeElement!.textContent = "+" + selectedCountryData.dialCode; 
    // }

 
    // console.log("New Country Selected: " + selectedCountryData.name + " | Country Code: +" + selectedCountryData.dialCode);
    //   });

  
    //     input.addEventListener('blur', () => {
    
    //       let fullPhoneNumber = iti.getNumber();

    //       if (fullPhoneNumber.startsWith("+")) {
    //         fullPhoneNumber = fullPhoneNumber.substring(1);  
    //       }
    //       console.log("Full phone number:", fullPhoneNumber);
    //       this.signupForm.patchValue({ mobile: fullPhoneNumber });
    //       console.log("Updated mobile field in the form:", this.signupForm.value.mobile);
    //        console.log(typeof( this.signupForm.value.mobile))
    //     });

    //   } else {
    //     console.error("The phone input element was not found.");
    //   }






    //   this.finishSignupForm = this.fb.group({
    //     country: ['', Validators.required],
      
    //     email: [''],

    //     gender: ['', Validators.required],
    //     birthday: ['', Validators.required],
    //     mobile:['']
    //   });
    //   this.http.get<any>('https://restcountries.com/v3.1/all').subscribe((data) => {
    //     console.log(data);
    //     this.countries = data.map((country:any) => ({
    //       name: country.name.common,
    //       code: country.cca2,
    //       flag: country.flags.svg
    //     }));
    //   });


  }

//   ngAfterViewInit(): void {

 


 


 

//     this.loginForm.reset();









//   }




//   title = 'StudiFlats';
//   message: any = null;
//   value: string = '';
//   options:any;
//   selectedOption:string='';
//   birthday:any;



  searchVisible: boolean = false;

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    // const searchElement = this.renderer.selectRootElement('#search', true);
    // if (this.searchVisible) {
    //   this.renderer.appendChild(document.body, searchElement);
    // } else {
    //   this.renderer.removeChild(document.body, searchElement);
    // }
  }

//   activeIndex: number = 0;

// onStepChange(event: any) {
//  this.activeIndex = event.index;
// }
// showBooking:boolean=true;

// onsubmitLogin(){
// this.showBooking=true;
// }

// displayModalsign:any;
// openModalSign(){

//    this.displayModalsign='block';
//    this.hideLogin();
// }
// onCloseSignModal() {
//   this.displayModalsign='none';
//   this.displayInfo='none';
//   this.displayVerify='none';
//   this.displayVerifyForget='none';
//   this.userService.closeModal();
// }
// displayVerify:any
// isOtpValid:boolean=false;
// uuidforgot:any;
// resetToken:any;

// openverifyModal(){


// let mobileAPI=null;

//   mobileAPI=this.loginForm.value.mobile;
//   console.log(mobileAPI)

// if(mobileAPI===null){
//   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'you must write your phone' });

// }else{



//   this.userService.sendForgotPasswordOtp(mobileAPI).subscribe(
//     response => {
    
//       console.log('OTP sent successfully', response);
//       this.uuidforgot=response.uuid;
//       this.resetToken=response.reset_Token;
//       localStorage.setItem('token', response.reset_Token);
//       this.displayModalsign='none';
//        this.isVisiblelogin = 'none';

//         this.displayVerifyForget='block'

//     },
//     error => {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message,life: 500 });
//       console.error('Error sending OTP', error);
 
//     }
//   );
// }
// }
// displayInfo:any;
// openInfoModal(){
//   this.displayInfo='block';
// }
// displayForgetPass:any;

// openForgetModal(){

//     this.userService.checkOtp(this.otp, this.uuidforgot).subscribe(
//       response => {
         
//         console.log('OTP verified successfully', response);
//         this.displayForgetPass='block';
//         this.displayVerifyForget='none'
//          this.isVisiblelogin = 'none';
//       },
//       error => {
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//         console.error('Error verifying OTP', error);

//       }
//     );


// }
// displayVerifyForget:any;

// openChangeModal(){
//   this.displayForgetPass='block';
//   this.displayVerifyForget='none'
//   this.isVisiblelogin = 'none';
// }




// passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
//   const password = group.get('password')?.value;
//   const confirmPassword = group.get('confirmPassword')?.value;
//   return password === confirmPassword ? null : { 'mismatch': true };
// }
// passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   const password = control.value;
//   if (!password) {
//     return null;
//   }


//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumeric = /[0-9]/.test(password);
//   const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
//   return valid ? null : { 'weakPassword': true };
// }




// logout(): void {


 
//   this.userService.logout().subscribe(
//     response => {

//       console.log('Logout successful', response);
//       localStorage.removeItem('token');
//       this.router.navigate(['/']);
 
//     },
//     error => {
//       console.error('Logout failed', error);
//       localStorage.removeItem('token');
      
//     }
//   );





// }

// isAuthenticated(): boolean {

//   return !!localStorage.getItem('token');
// }

// onForgetSubmit(): void {
//   const password = this.forgetForm.get('password')?.value;
//   const confirmPassword = this.forgetForm.get('confirmPassword')?.value;


//   this.userService.resetPassword(password, confirmPassword, this.uuidforgot, this.resetToken).subscribe(
//     response => {
//       this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
//       console.log('Password reset successfully', response);
//       this.displayForgetPass='none';
 
//     },
//     error => {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//       console.error('Error resetting password', error);
       
//     }
//   );
// }


// onSubmit(): void {
// console.log(this.signupForm)

 


//     const userAccount = {
//       mobile: this.signupForm.value.mobile,
//       fullName: this.signupForm.value.fullName,
//       password: this.signupForm.value.password,
//       confirm_Password: this.signupForm.value.confirmPassword
//     };
//     Globals.name = userAccount.fullName;
//     localStorage.setItem('name', Globals.name);
 
//     if (isValidEmail(userAccount.mobile)) {
//       Globals.email = userAccount.mobile;
//       localStorage.setItem('email', Globals.email);
//     } else {
//       Globals.phone = userAccount.mobile;
//       localStorage.setItem('phone', Globals.phone);
//     }

//     console.log('Sending user data to API:', userAccount);
//     this.userService.createUser(userAccount).subscribe(
//       response => {
        
//         console.log('User account created successfully', response);
 
//         this.displayVerify='block';
//         this.uuid=response.uuid;



//       },
//       error => {
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//         console.error('Error creating user account', error);

//       }
//     );
 
// }


// uuid:string='';
// reuuid:string='';
// otp:string='';
// onVerifyOtp(): void {
//   this.userService.checkOtp(this.otp, this.uuid).subscribe(
//     response => {
       
//       console.log('OTP verified successfully', response);
//       this.displayModalsign='none';
//       this.displayVerify='none';

//       this.openInfoModal()

//     },
//     error => {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//       console.error('Error verifying OTP', error);

//     }
//   );
// }
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

// emailGoogle:boolean=false;
// provider:any;
// mobileSocial:any;
// onFinishSignSubmit() {
//   if (this.finishSignupForm.valid) {
//     const formData = this.finishSignupForm.value;
//     const genderName = formData.gender.name;
 
//     this.provider='Local';
//     if(this.socialSign){
//       this.provider='Google';

//     }
//     this.userService.sendUserData(
//       formData.email,
//       genderName,
//       formData.country,
//       formData.birthday,
//       this.uuid,
//       this.mobileSocial,
//       this.provider
//     ).subscribe(
//       response => {
//         this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
//         console.log('Form Submitted Successfully:', response);
//         this.displayInfo='none';
//         if(this.socialSign===false){
//           setTimeout(() => {

//             this.isVisiblelogin='block';

//           },  3000);
//         }
//           this.socialSign=false;

//       },
//       error => {
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//         console.error('Error submitting form:', error);
 

//       }
//     );
//   } else {
//     console.error(this.finishSignupForm);
//     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
//     this.finishSignupForm.markAllAsTouched();
//   }
// }



// isVisiblelogin='none';
// loginMethod: string = 'whatsApp';
//   loginForm!: FormGroup;
//   showLogin(): void {




//     if (!this.isAuthenticated()) {

//       this.isVisiblelogin = 'block';

//       this.displayModalsign='none';

//     this.displayInfo='none';
//     this.displayVerify='none'
//     this.displayVerifyForget='none'

//     }else{
//       this.logout();
//       this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'you logged out successfully' });


//     }





//   }



//   hideLogin(): void {
//     this.isVisiblelogin = 'none';
//     this.displayForgetPass='none';
//   }
// onLoginSubmit(): void {
//   console.log(this.loginForm)
//     let mobileAPI='';
//     let pass=this.loginForm.value.password;
//     console.log(this.loginForm.value)

//     if (this.loginForm.valid) {

   
//       if(this.loginMethod==='email'){
//         mobileAPI=this.loginForm.value.email;
//       }else if(this.loginMethod==='whatsApp'){
//         mobileAPI=this.loginForm.value.mobile;
//       }

//       console.log('Sending user data to API:',this.loginForm.value.mobile,this.loginForm.value.email );
//       this.userService.loginUser(mobileAPI,pass).subscribe(
//         response => {
//           this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
//           console.log('User account created successfully', response);
//           localStorage.setItem('token', response.token);
//           this.getProfileData(response.token);


       


//          this.hideLogin();


//         },
//         error => {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
//           console.error('Error creating user account', error);
//           if(error.error.message==="Oops!! Your Profile isn't completed yet , Please complete it"){
//              this.displayInfo='block';
//              this.isVisiblelogin='none';
//              this.uuid=error.error.uuid;
//           }

//         }
//       );
//     } else {
//       console.error('Form is invalid');
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
//       this.loginForm.markAllAsTouched();

//   }
// }


// profileData: any;
// getProfileData(token:any): void {
//   this.userService.getProfile().subscribe(
//     data => {
//       this.profileData = data;
//       console.log('ProfileData :',this.profileData);
//       this.userName= this.profileData[0]?.fullName;
 
//       this.authService.login(this.userName, token);
//     },
//     error => {
//       console.error('There was an error!', error);
//     }
//   );
// }
//      userName:any;



 
// input:any=null;
// initMobileSocial(){
//   console.log('heeeee')
//   const input = document.querySelector("#socialPhone") as HTMLInputElement;
//   this.input=input;
 
//   if (input && !input.dataset['itiInitialized']) {
//     console.log('Phone input element found and initializing intlTelInput:', input);
 
//     const iti = intlTelInput(input, {
//       initialCountry: "de",
//       preferredCountries: ["de", "us", "gb"],
//       separateDialCode: true,
       
//       utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
//        searchCountry:true,
//       useFullscreenPopup: false,

//     });





//     input.dataset['itiInitialized'] = 'true';
//     console.log(input.dataset['itiInitialized'])


//     input.addEventListener('blur', () => {
//       let fullPhoneNumber = iti.getNumber();
//       if (fullPhoneNumber.startsWith("+")) {
//         fullPhoneNumber = fullPhoneNumber.substring(1);
//       }
//       console.log("Full phone number:", fullPhoneNumber);
//       this.mobileSocial=fullPhoneNumber;
//       console.log("Updated mobile field in the form:",this.mobileSocial);
//     });}
// }

//   signInWithGoogle(): void {


//     if(!localStorage.getItem('token')){
//       this.userService.signInWithGoogle();
//       this.socialSign=true;


//        setTimeout(() => {


//         this.initMobileSocial();

//         this.userService.uuid.subscribe(value => {
//           this.uuid = value;
//           console.log('Component1 received shared data:', this.uuid);
//         });
//         this.userService.modalInfo$.subscribe(show => {
//           console.log(show)
    
//           if( this.input!==null){
//             this.displayInfo = show ? 'block' : 'none';
//           }
//           if(this.displayInfo==='block'){
//             this.isVisiblelogin='none';
//            }


//         });

 


//       }, 500);
//     }else{
//       this.userService.signInWithGoogle();
//     }


//   }






// socialSign:boolean=false;
//    signUpWithGoogle(): void {

//       this.socialSign=true;
//     console.log('sign up')
//     console.log(this.mobileSocial)
//     this.userService.signInWithGoogle();
//     setTimeout(() => {
       

//       this.userService.modalInfo$.subscribe(show => {


//         if( this.input!==null){
//           this.displayInfo = show ? 'block' : 'none';
//         }
//         if(this.displayInfo==='block'){
//           this.displayModalsign='none';
//          }
//       });



//     }, 500);

//   }
 

}
