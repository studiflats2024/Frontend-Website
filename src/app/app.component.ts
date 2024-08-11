
import { Component, OnInit,Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService,UserAccount } from './services/user.service';



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
export class AppComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private renderer: Renderer2,private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.options=[  { name: 'Male', code: 'NY' },
      { name: 'Female', code: 'RM' },];

      this.signupForm = this.fb.group({
        mobile: ['', Validators.required],
        fullName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
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

onSubmit(): void {
  if (this.signupForm.valid) {
    const userAccount = {
      mobile: this.signupForm.value.mobile,
      fullName: this.signupForm.value.fullName,
      password: this.signupForm.value.password,
      confirm_Password: this.signupForm.value.confirmPassword // تعديل التسمية لتتوافق مع الـ API
    };
    console.log('Sending user data to API:', userAccount); // تحقق من البيانات هنا
    this.userService.createUser(userAccount).subscribe(
      response => {
        console.log('User account created successfully', response);
        // Handle success scenario
      },
      error => {
        console.error('Error creating user account', error);
        // Handle error scenario
      }
    );
  } else {
    console.error('Form is invalid');
  }
}

}
