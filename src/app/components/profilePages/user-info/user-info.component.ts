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
    // const phoneInput = document.querySelector('.phonee');

    // const iti = (window as any).intlTelInput(phoneInput, {
    //   initialCountry: 'de',
    //   separateDialCode: true,
    //   preferredCountries: ['de', 'us', 'gb'],
    //   utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
    // });

    // phoneInput!.addEventListener('countrychange', () => {
    //   this.phoneNumber = iti.getNumber();
    // });
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
    // this.visible = true;
    this.emailDialog=true;
  }

  handleContinue() {
    // Logic to handle OTP submission
    console.log(this.otp);  // You can handle the OTP submission logic here

      this.emailDialog = false;
    setTimeout(() => {
       this.visible = true;
    }, 1000);
  }

  showDialog1() {

    this.phoneDialog=true;
    setTimeout(() => {
      // this.phoneDialog = true;
      const phoneInputs = document.querySelectorAll('.phonee'); // Select all elements with class "phonee"
     console.log(phoneInputs)
      phoneInputs.forEach((phoneInput, index) => {
        const iti = (window as any).intlTelInput(phoneInput, {
          initialCountry: 'de',
          separateDialCode: true,
          preferredCountries: ['de', 'us', 'gb'],
          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
        });
        // let iti:any;
        // if (!phoneInput.classList.contains("iti")) {
        //    iti = (window as any).intlTelInput(phoneInput, {
        //     initialCountry: 'de',
        //     separateDialCode: true,
        //     preferredCountries: ['de', 'us', 'gb'],
        //     utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
        //   });

        // }

        phoneInput.addEventListener('blur', () => {
          let phoneNumber = iti.getNumber(); // Get the phone number with country code
          if (phoneNumber.startsWith('+')) {
            phoneNumber = phoneNumber.slice(1); // Remove "+" from the phone number
          }

          // Assign the phone number to the correct property
          if (index === 0) {
            this.currentPhone = phoneNumber;
            console.log(this.currentPhone);
          } else if (index === 1) {
            this.newPhone = phoneNumber;
            console.log(this.newPhone);
          }

        });
      });

      console.log(this.phoneDialog);
    }, 500);
  }

  handleContinue1() {
    // Logic to handle OTP submission
    console.log(this.value);  // You can handle the OTP submission logic here
    // this.visible1 = false;


    if (this.value && this.uuid) {
      this.userService.checkOtp(this.value, this.uuid).subscribe(
        (response) => {
          console.log('OTP check successful:', response);
          this.visible1 = false;
          this.passwordDialog=true;
          // Handle success (e.g., navigate to another page, show success message)
        },
        (error) => {
          console.error('Error checking OTP:', error);
          this.messageService.add({ severity: 'error', summary: 'otp', detail: 'invalid otp' });
          // Handle error (e.g., show error message to the user)
        }
      );
    } else {
      console.error('Both OTP and UUID are required.');
      // Optionally handle the case where inputs are missing
    }


  }

  emailDialog:boolean=false;
  phoneDialog:boolean=false;

  showDialogEmail() {
    this.emailDialog = true;
  }


   currentEmail:any;
    newEmail:any;
    currentPassword:any;
  handleContinueEmail() {


    this.userService.updateEmail(this.currentEmail, this.currentPassword, this.newEmail).subscribe(
      response => {
        console.log('Email updated successfully:', response);
        this.emailDialog = false;
        // this.visible=true;
        this.emaillogin=this.newEmail;
        this.messageService.add({ severity: 'success', summary: 'Update Mail', detail: 'Email Updated successfully' });

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Update Mail', detail: 'failed to update email' });

        console.error('Error updating email:', error);
      }
    );
  }
  currentPhone:any;
  newPhone:any;
  currentPasswordPhone:any
  showDialogPhone() {
    // this.phoneDialog = true;

  }

  handleContinuePhone() {


    this.userService.updatePhone(this.currentPhone, this.currentPasswordPhone, this.newPhone).subscribe(
      response => {
        this.phoneDialog = false;
        this.phonelogin=this.newPhone;
        this.messageService.add({ severity: 'success', summary: 'Update Phone', detail: 'Phone Updated successfully' });
        console.log('Phone updated successfully:', response);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Update Mail', detail: 'failed to update Phone' });
        console.error('Error updating phone:', error);
      }
    );
  }


  currentPass:string='';
  newPass:string='';
  confirmNewPass:string='';

  passwordDialog:boolean=false;
  uuid:any;
  resetToken:any;
  showDialogPass() {
    // this.passwordDialog = true;


    if (this.phonelogin) {
      this.userService.sendForgotPasswordOtp(this.phonelogin).subscribe(
        (response) => {
          console.log('OTP sent successfully:', response);
          this.uuid=response.uuid;
          this.resetToken=response.reset_Token;
          this.visible1=true;
          // Handle success (e.g., show a message to the user)
        },
        (error) => {
          console.error('Error sending OTP:', error);
          // Handle error (e.g., show an error message to the user)
        }
      );
    } else {
      console.error('Mobile number is required');
      // Optionally handle the case where mobile number is empty
    }
  }

  handleContinuePass() {



    this.userService.resetPassword(this.newPass, this.confirmNewPass, this.uuid, this.resetToken).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: response.message });
        console.log('Password reset successfully', response);
        this.passwordDialog=false;
        // Handle success, e.g., navigate to a login page or show a success message
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        console.error('Error resetting password', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

  profileData: any;
  userName:any;
  emaillogin:any;
  phonelogin:any;
  imgProfile:any;
  nationality:any
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
      this.imgProfile=this.profileData[0]?.profile_pic ;
      this.country=this.profileData[0]?.nationality;

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
country:any;
updateProfile() {
  if (this.userName && this.gender && this.country && this.birthday) {
    this.userService.updateFullProfile(this.userName, this.gender, this.country, this.birthday).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Your Info Updated successfully'});

        // Handle success (e.g., show success message to the user)
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.messageService.add({severity: 'danger', summary: 'Error', detail: 'failed to update your info please check from your data'});

        // Handle error (e.g., show error message to the user)
      }
    );
  } else {
    console.error('All fields are required.');
    // Optionally handle form validation errors
  }
}

}


