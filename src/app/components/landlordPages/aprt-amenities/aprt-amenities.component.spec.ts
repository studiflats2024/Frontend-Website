import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtAmenitiesComponent } from './aprt-amenities.component';

describe('AprtAmenitiesComponent', () => {
  let component: AprtAmenitiesComponent;
  let fixture: ComponentFixture<AprtAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtAmenitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
