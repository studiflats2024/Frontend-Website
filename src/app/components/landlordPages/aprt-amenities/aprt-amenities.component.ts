import { Component } from '@angular/core';

@Component({
  selector: 'app-aprt-amenities',
  templateUrl: './aprt-amenities.component.html',
  styleUrls: ['./aprt-amenities.component.css']
})
export class AprtAmenitiesComponent {


  sections = [

  {
    name: 'General',
    options: [
      { label: 'Wheelchair Accessibility', value: false },
      { label: 'Elevator', value: false },
      { label: 'Desk Or Work Space', value: false },
      { label: 'Door Intercom System', value: false },
      { label: 'Balcony', value: false },
      { label: 'Terrace', value: false },
      { label: 'Tv', value: false },
      { label: 'Coffee Machine', value: false },
      { label: 'Washing Machine', value: false }
    ]
  }
    ,
    {
      name: 'Kitchen',
      options: [
        { label: 'Stove', value: false },
        { label: 'Oven', value: false },
        { label: 'Refrigerator', value: false },
        { label: 'Freezer', value: false },
        { label: 'Dish Washer', value: false },
        { label: 'Microwave', value: false },
        { label: 'Kettle', value: false },
        { label: 'Toaster', value: false },
        { label: 'Cutlery', value: false }
      ]
    },
    {
      name: 'Bed Room',
      options: [
        { label: 'Bed Linens', value: false },
        { label: 'Blankets', value: false },
        { label: 'Closet Or Chest Of Drawers', value: false },
        { label: 'Pillows', value: false },
        { label: 'Bed Side Lamp', value: false }
      ]
    },
    {
      name: 'Bathroom',
      options: [
        { label: 'Shower', value: false },
        { label: 'Bathtub', value: false },
        { label: 'Hairdryer', value: false },
        { label: 'Bidet', value: false },
        { label: 'Towels', value: false }
      ]
    },
    {
      name: 'Additional Equipment',
      options: [
        { label: 'Iron', value: false },
        { label: 'Ironing Board', value: false },
        { label: 'Vacuum Cleaner', value: false },
        { label: 'Broom', value: false },
        { label: 'Air Conditioning', value: false },
        { label: 'Floor Heating', value: false },
        { label: 'Floor Mop', value: false },
        { label: 'Barbecue', value: false },
        { label: 'Swimming Pool', value: false },
        { label: 'Smoke Detector', value: false },
        { label: 'Home Cinema', value: false },
        { label: 'Smart Home Technology', value: false },
        { label: 'Sauna', value: false },
        { label: 'Study Rooms', value: false },
        { label: 'Out Door Area', value: false },
        { label: 'Community Lounge', value: false }
      ]
    }
  ];


     // Array to store rules
     rules: Array<{ ruleName: string  }> = [];

     // Add a new rule (empty at first)
     addRule() {
       this.rules.push({
         ruleName: '',

       });
     }

     // Remove a rule by its index
     removeRule(index: number) {
       this.rules.splice(index, 1);
     }

}
