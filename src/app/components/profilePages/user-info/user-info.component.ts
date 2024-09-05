import { Component ,OnInit, AfterViewInit , AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, AfterViewInit {


  items!: any;

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My Info', routerLink: '/user-info' }
    ];
  }

  value!: string;
  phoneNumber!: string;
  gender!: string;
  birthday!: Date;

  ngAfterViewInit(): void {
    const phoneInput = document.querySelector('#phone');

    const iti = (window as any).intlTelInput(phoneInput, {
      initialCountry: 'de',
      separateDialCode: true,  // Separate dial code
      preferredCountries: ['de', 'us', 'gb'],
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
    });

    phoneInput!.addEventListener('countrychange', () => {
      this.phoneNumber = iti.getNumber(); // Update the phone number with country code
    });
  }





  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },

  ];

  onSubmit(form: any): void {
    if (form.valid) {
      // Remove the "+" sign from the phone number
      const formattedPhone = this.phoneNumber.startsWith('+')
        ? this.phoneNumber.substring(1)
        : this.phoneNumber;

      console.log('Form Submitted', {
        username: this.value,
        phone: formattedPhone,
        gender: this.gender,
        birthday: this.birthday
      });
    } else {
      console.log('Form is invalid');
    }
  }

  //////////////dialogs/////////////////
  visible: boolean = false;
  visible1: boolean = false;

  otp: string = '';
  email: string = '';


  showDialog() {
    this.visible = true;

  }

  handleContinue() {
    // Logic to handle OTP submission
    console.log(this.otp);  // You can handle the OTP submission logic here
    this.visible = false;

    setTimeout(() => {
      this.emailDialog = true;
    }, 1000);
  }

  showDialog1() {
    this.visible1 = true;
  }

  handleContinue1() {
    // Logic to handle OTP submission
    console.log(this.otp);  // You can handle the OTP submission logic here
    this.visible1 = false;

    setTimeout(() => {

      this.phoneDialog = true;
      const phoneInput = document.querySelector('#phone');

      const iti = (window as any).intlTelInput(phoneInput, {
        initialCountry: 'de',
        separateDialCode: true,  // Separate dial code
        preferredCountries: ['de', 'us', 'gb'],
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
      });

      phoneInput!.addEventListener('countrychange', () => {
        this.phoneNumber = iti.getNumber(); // Update the phone number with country code
      });
      console.log(this.phoneDialog)
    }, 1000);
  }

  emailDialog:boolean=false;
  phoneDialog:boolean=false;

  showDialogEmail() {
    this.emailDialog = true;
  }

  handleContinueEmail() {
    // Logic to handle OTP submission
    console.log(this.otp);  // You can handle the OTP submission logic here
    this.emailDialog = false;
  }

  showDialogPhone() {
    this.phoneDialog = true;
  }

  handleContinuePhone() {
    // Logic to handle OTP submission
    console.log(this.otp);  // You can handle the OTP submission logic here
    this.phoneDialog = false;
  }


  currentPass:string='';
  newPass:string='';
  confirmNewPass:string='';

  passwordDialog:boolean=false;

  showDialogPass() {
    this.passwordDialog = true;
  }

  handleContinuePass() {

    this.passwordDialog = false;
  }

}
