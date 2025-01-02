import { Component ,OnInit, AfterViewInit , AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { BookingService } from '../../../services/booking.service';  // Adjust path based on your project structure
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
// import { format } from 'date-fns';

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
    this. resetForm()
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


  
  resetForm() {
    

    const phoneInput = (<HTMLInputElement>document.getElementById('phonee'));
    if (phoneInput) {
      phoneInput.value = ''; // Clear the input manually
    }
    
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
          // utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js"
          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
          searchCountry:true,
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
         setTimeout(() => {
          this. resetForm()
         }, 500);
         
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
        phoneInput.addEventListener("countrychange", function() {
          // Clear the previous flag and dial code
          const flagContainer = document.querySelector(".iti__selected-flag");
          const dialCodeElement = document.querySelector(".iti__dial-code");
           console.log(flagContainer,dialCodeElement)
          // Remove previous flag and code visually
          if (flagContainer) {
              flagContainer.classList.remove("iti__selected-flag");
          }
          if (dialCodeElement) {
              dialCodeElement.textContent = '';  
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


  currentPhone:any='';
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

  isValidDate(dateString: string): boolean {
    console
    // تحقق من تطابق التنسيق DD/MM/YYYY
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateString.match(dateRegex);
  
    if (!match) return false; // التنسيق غير صحيح
  
    const [_, day, month, year] = match.map(Number); // استخراج اليوم، الشهر، السنة
  
    // التحقق من القيم المنطقية للتاريخ
    const date = new Date(year, month - 1, day); // إنشاء التاريخ
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
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


  
  
  
  
 
//////////////////////////////////////////////////////////////////////////////////////////////////////
  convertFromISOo(isoString: string): string {
    // التحقق إذا كان النص بصيغة ISO
    // const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    // if (!isoRegex.test(isoString)) {
    //   console.error('Invalid ISO date format:', isoString);
    //   return '';
    // }
  console.log(isoString)
    // إنشاء كائن Date من النص
    const date = new Date(isoString);

      // ضبط الوقت إلى منتصف الليل UTC
  // date.setUTCHours(0, 0, 0, 0);
  console.log(date)
  
    // استخراج اليوم، الشهر، والسنة
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // إضافة 1 لأن الأشهر تبدأ من 0
    const year = date.getUTCFullYear();
  console.log(`${day}/${month}/${year}`)
    // إرجاع التاريخ بصيغة DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }


  convertFromISO(isoString: string): string {
    console.log('ISO Input:', isoString);
  
    // تقسيم التاريخ يدوياً للتأكد من عدم حدوث مشكلة المنطقة الزمنية
    const [month, day, year] = isoString.split('/').map(Number);
  
    if (!day || !month || !year) {
      console.error('Invalid date format. Expected MM/DD/YYYY:', isoString);
      return '';
    }
  
    // إنشاء كائن Date بالاعتماد على UTC
    const date = new Date(Date.UTC(year, month - 1, day));
  
    console.log('Date Object (UTC):', date.toUTCString());
  
    // استخراج اليوم، الشهر، والسنة بتوقيت UTC
    const formattedDay = String(date.getUTCDate()).padStart(2, '0');
    const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
    const formattedYear = date.getUTCFullYear();
  
    // إرجاع التاريخ بالتنسيق MM/DD/YYYY
    const formattedDate = `${formattedMonth}/${formattedDay}/${formattedYear}`;
    console.log('Formatted Date:', formattedDate);
  
    return formattedDate;
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
      this.userService.updateUserName(this.userName);
      this.emaillogin=this.profileData[0]?.email;
      this.phonelogin=this.profileData[0]?.mobile;
      this.gender=this.profileData[0]?.gender;
      // this.birthday=this.profileData[0]?.doB;
      this.birthday= this.convertFromISO(this.profileData[0]?.doB);

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
  
  // this.userService.uploadImage(this.selectedFile).subscribe(
  //   (response: any) => {
     
  //     const imageUrl = response[0].file_Path;
  //     console.log(imageUrl)
  //     this.selectedFile=response[0].file_Path;
      
  //   },
  //   (error) => {
  //     console.error('Error uploading file:', error);
  //   })
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
        this.imgProfile=response.url ;
        console.log(this.imgProfile)
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
// Helper method to format a date to 'YYYY-MM-DD'
formatDateToYYYYMMDD(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Zero-based month, padStart ensures two digits
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
country:any;
birthdayApi:string=''
updateProfile() {
  this.birthdayApi= this.convertToISO(this.birthday);

  if (this.userName && this.gender && this.country && this.birthdayApi) {
    // const formattedBirthday = this.formatDateToYYYYMMDD(this.birthday);
    this.userService.updateFullProfile(this.userName, this.gender, this.country, this.birthdayApi).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Your Info Updated successfully'});
        ///////SHARE USERNAME///////////////////
        this.userService.updateUserName(this.userName);
        localStorage.setItem('userNameUpdated',this.userName)

        this.getProfileData()

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

onImageSelect(img: any) {
  
    this.userService.uploadImage(img).subscribe(
      (response: any) => {
        // Assuming the API returns a URL to the uploaded image
        const imageUrl = response[0].file_Path;
        console.log(imageUrl)
        
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
 
}

}


