import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtRulesComponent } from './aprt-rules.component';

describe('AprtRulesComponent', () => {
  let component: AprtRulesComponent;
  let fixture: ComponentFixture<AprtRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
