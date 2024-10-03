import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprtPhotosComponent } from './aprt-photos.component';

describe('AprtPhotosComponent', () => {
  let component: AprtPhotosComponent;
  let fixture: ComponentFixture<AprtPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprtPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprtPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
