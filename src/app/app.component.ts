
import { Component, OnInit,Renderer2, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService,UserAccount } from './services/user.service';
import {  MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Globals, isValidEmail } from '../app/globals/global';

declare var intlTelInput: any;
declare var intlTelInputUtils: any;
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
export class AppComponent implements OnInit, AfterViewInit{

  signupForm!: FormGroup;
  finishSignupForm!: FormGroup;
  countries: { name: string; code: string; flag: string }[] = [];
  selectedCountry: any;

  constructor(private renderer: Renderer2,private fb: FormBuilder, private userService: UserService,  private messageService: MessageService,  private http: HttpClient) {}
  ngOnInit(): void {
    this.options=[  { name: 'Male', code: 'NY' },
      { name: 'Female', code: 'RM' }, { name: 'UnSpecified', code: 'RM' }];

      this.loginForm = this.fb.group({
        mobile: '',

        email: '',
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],

      } );

      const inputlogin = document.querySelector("#phonee");

      if (inputlogin) {
        const iti = intlTelInput(inputlogin, {
          initialCountry: "de",  // الدولة الافتراضية
          preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
          separateDialCode: true,  // فصل كود الدولة
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"  // تحميل سكربت الأدوات المساعدة
        });

        // حدث عند فقدان التركيز على الحقل
        inputlogin.addEventListener('blur', () => {
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

      this.signupForm = this.fb.group({
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
        fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        // email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });




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

    const inputlogin = document.querySelector("#phonee");

    if (inputlogin) {
      const iti = intlTelInput(inputlogin, {
        initialCountry: "de",  // الدولة الافتراضية
        preferredCountries: ["de", "us", "gb"],  // الدول المفضلة
        separateDialCode: true,  // فصل كود الدولة
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"  // تحميل سكربت الأدوات المساعدة
      });

      // حدث عند فقدان التركيز على الحقل
      inputlogin.addEventListener('blur', () => {
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
  this.displayVerify='none'
}
displayVerify:any
openverifyModal(){
this.displayVerify='block'
}
displayInfo:any;
openInfoModal(){
  this.displayInfo='block';
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
onSubmit(): void {
console.log(this.signupForm)

  if (this.signupForm.valid) {


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
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('User account created successfully', response);
        this.openverifyModal();
        this.uuid=response.uuid;



      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error creating user account', error);

      }
    );
  } else {
    console.error('Form is invalid');
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'signed failed' });
    this.signupForm.markAllAsTouched();
  }
}


uuid:string='';
otp:string='';
onVerifyOtp(): void {
  this.userService.checkOtp(this.otp, this.uuid).subscribe(
    response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
      console.log('OTP verified successfully', response);
      this.openInfoModal()
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      console.error('Error verifying OTP', error);

    }
  );
}


onFinishSignSubmit() {
  if (this.finishSignupForm.valid) {
    const formData = this.finishSignupForm.value;
    const genderName = formData.gender.name;

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
    this.isVisiblelogin = 'block';

    this.displayModalsign='none';

  this.displayInfo='none';
  this.displayVerify='none'
  }

  hideLogin(): void {
    this.isVisiblelogin = 'none';
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
          localStorage.setItem('token', response.token);


         let namelogin:any= localStorage.getItem('name');

          let emaillogin:any=  localStorage.getItem('email');

            let phonelogin:any =localStorage.getItem('phone');

            localStorage.setItem('namelogin', namelogin);
            localStorage.setItem('emaillogin',emaillogin);
            localStorage.setItem('phonelogin', phonelogin);

         this.hideLogin();


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
