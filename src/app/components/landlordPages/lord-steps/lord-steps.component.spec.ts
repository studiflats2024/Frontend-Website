import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LordStepsComponent } from './lord-steps.component';

describe('LordStepsComponent', () => {
  let component: LordStepsComponent;
  let fixture: ComponentFixture<LordStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LordStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LordStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
