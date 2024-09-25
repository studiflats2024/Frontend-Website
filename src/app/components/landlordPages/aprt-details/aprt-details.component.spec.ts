import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtDetailsComponent } from './aprt-details.component';

describe('AprtDetailsComponent', () => {
  let component: AprtDetailsComponent;
  let fixture: ComponentFixture<AprtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
