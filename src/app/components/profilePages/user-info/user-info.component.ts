import { Component ,OnInit, AfterViewInit , AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { BookingService } from '../../../services/booking.service';  // Adjust path based on your project structure
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, AfterViewInit {


  items!: any;
  constructor(private cdr: ChangeDetectorRef,private messageService: MessageService,private userService:UserService,private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.items = [
      { label: 'My account', routerLink: '/my-account' },
      { label: 'My Info', routerLink: '/user-info' }
    ];
    this.getProfileData()
  }

  value!: string;
  phoneNumber!: string;
  gender!: string;
  birthday!: string;

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
        username: this.userName,
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

  profileData: any;
  userName:any;
  emaillogin:any;
  phonelogin:any;
  imgProfile:any;
getProfileData(): void {
  this.userService.getProfile().subscribe(
    data => {
      this.profileData = data;
      console.log('ProfileData :',this.profileData);
      this.userName= this.profileData[0]?.fullName;
      this.emaillogin=this.profileData[0]?.email;
      this.phonelogin=this.profileData[0]?.mobile;
      this.gender=this.profileData[0]?.gender;
      this.birthday=this.profileData[0]?.doB;
      this.imgProfile=this.profileData[0]?.doB;
      console.log(this.birthday)

      // this.authService.login(this.userName, token);
    },
    error => {
      console.error('There was an error!', error);
    }
  );
}

selectedFile: File | null = null;
onUpload(event: any) {
  console.log('File Uploaded:', event);
  const file = event.files[0];
  this.selectedFile = file;
  this.cdr.detectChanges();
  console.log(file)
  if (file) {
    this.selectedFile = file;
  }



}

updateImg(){
  if (this.selectedFile) {
    this.userService.uploadProfileImage(this.selectedFile).subscribe(
      (response) => {
        console.log('Image upload successful:', response);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'updating image successfully'});
      },
      (error) => {
        console.error('Error uploading image:', error);
        this.messageService.add({severity: 'danger', summary: 'Error', detail: 'please upload again'});
      }
    );
  } else {
    console.error('No file selected!');
  }
}

}


