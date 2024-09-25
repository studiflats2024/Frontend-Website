import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtLocationComponent } from './aprt-location.component';

describe('AprtLocationComponent', () => {
  let component: AprtLocationComponent;
  let fixture: ComponentFixture<AprtLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
