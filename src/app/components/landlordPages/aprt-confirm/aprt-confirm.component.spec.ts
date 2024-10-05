import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtConfirmComponent } from './aprt-confirm.component';

describe('AprtConfirmComponent', () => {
  let component: AprtConfirmComponent;
  let fixture: ComponentFixture<AprtConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
