
import { Injectable } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Injectable({
  providedIn: 'root',
})
export class PhoneInputService {
  private itiInstances: Map<string, any> = new Map();

//   initialize(selector: string, initialValue: string = '') {
//     const input = document.querySelector(selector) as HTMLInputElement;
//     if (!input) {
//       console.warn(`❌ Element not found: ${selector}`);
//       return;
//     }

//     if (this.itiInstances.has(selector)) {
//       console.log(`✅ Already initialized: ${selector}`);
//       return;
//     }

//     const iti = intlTelInput(input, {
//       initialCountry: 'de',
//       separateDialCode: true,
//       utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js',
//     }as any);

//     (input as any).intlTelInput = iti;
//     this.itiInstances.set(selector, iti);

//     if (initialValue) {
//       setTimeout(() => {
//         iti.setNumber(initialValue.startsWith('+') ? initialValue : `+${initialValue}`);
//       }, 50);
//     }
//   }

//   get phone(): string {
//     return this.itiInstances.get('#phone')?.getNumber() || '';
//   }

//   get whatsapp(): string {
//     return this.itiInstances.get('#whatsapp')?.getNumber() || '';
//   }


initialize(selector: string, initialValue: string = '') {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;

  // if (this.itiInstances.has(selector)) return;
//   if (this.itiInstances.has(selector)) {
 
//    const input = document.querySelector(selector) as HTMLInputElement;
//    if (!input) {
//      this.itiInstances.delete(selector);  
//    } else {
//      return;
//    }
// }

  ///////////////////////////////////////////////////////

  const iti = intlTelInput(input, {
    initialCountry: 'de',
    separateDialCode: true,
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js'
  }as any);

  // ✅ تخزين الـ instance
  this.itiInstances.set(selector, iti);

  // ✅ Event: عند الخروج من الحقل
 input.addEventListener('blur', () => {
  const selectedCountry = iti.getSelectedCountryData(); // 🇩🇪 أو 🇮🇳 إلخ
  const dialCode = selectedCountry.dialCode; // بدون "+"
  let inputValue = input.value.trim(); // الرقم اللي المستخدم كتبه

  // 🧹 إزالة الأصفار الزائدة في بداية الرقم
  inputValue = inputValue.replace(/^0+/, '');

  // 🧬 دمج كود الدولة والرقم
  const fullNumber = `${dialCode}${inputValue}`;

  console.log('🌍 Country Code:', dialCode);
  console.log('📞 User Input:', inputValue);
  console.log('✅ Final Merged Number:', fullNumber);

  // ✅ تخزين الرقم في المتغير المناسب
  if (selector === '#phone') {
    this._phone = fullNumber;
  } else if (selector === '#whatsapp') {
    this._whatsapp = fullNumber;
  }
});

}

private _phone: string = '';
private _whatsapp: string = '';

get phone(): string {
  return this._phone;
}

get whatsapp(): string {
  return this._whatsapp;
}

 setPhoneNumber(selector: string, value: string) {
    const iti = this.itiInstances.get(selector);
    if (iti) {
      iti.setNumber(value.startsWith('+') ? value : `+${value}`);
      
    } else {
      console.warn(`❌ Cannot set phone number — selector not initialized yet: ${selector}`);
    }
  }

  isReady(selector: string): boolean {
  return this.itiInstances.has(selector);
}


 reset() {
  this._phone = '';
  this._whatsapp = '';
}




}
