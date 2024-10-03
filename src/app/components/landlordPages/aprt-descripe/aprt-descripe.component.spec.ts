import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtDescripeComponent } from './aprt-descripe.component';

describe('AprtDescripeComponent', () => {
  let component: AprtDescripeComponent;
  let fixture: ComponentFixture<AprtDescripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtDescripeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtDescripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
