import { Component } from '@angular/core';

@Component({
  selector: 'app-aprt-type',
  templateUrl: './aprt-type.component.html',
  styleUrls: ['./aprt-type.component.css']
})
export class AprtTypeComponent {
selectedType:string='';
numOfApartments!: number;
apartmentDescription!: string;
}
