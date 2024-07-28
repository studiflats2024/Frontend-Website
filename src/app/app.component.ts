
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  constructor() {}
  ngOnInit(): void {
  }
  title = 'StudiFlats';
  message: any = null;



  searchVisible: boolean = false;

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }



}
