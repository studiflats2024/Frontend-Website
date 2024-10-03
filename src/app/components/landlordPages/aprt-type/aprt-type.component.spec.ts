import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtTypeComponent } from './aprt-type.component';

describe('AprtTypeComponent', () => {
  let component: AprtTypeComponent;
  let fixture: ComponentFixture<AprtTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
