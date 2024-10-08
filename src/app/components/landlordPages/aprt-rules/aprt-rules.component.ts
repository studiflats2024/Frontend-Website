import { Component , HostListener} from '@angular/core';

@Component({
  selector: 'app-aprt-rules',
  templateUrl: './aprt-rules.component.html',
  styleUrls: ['./aprt-rules.component.css']
})
export class AprtRulesComponent {
  rent: number | null = null;
  deposit: number | null = null;

  isSmallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;  // Check if the screen width is small (e.g., less than 768px)
  }

    // Array to store rules
  rules: Array<{ ruleName: string, isAllowed: boolean }> = [];

  // Add a new rule (empty at first)
  addRule() {
    this.rules.push({
      ruleName: '',
      isAllowed: false
    });
  }

  // Remove a rule by its index
  removeRule(index: number) {
    this.rules.splice(index, 1);
  }

}
