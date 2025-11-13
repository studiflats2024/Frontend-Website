import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanCoureFormComponent } from './german-coure-form.component';

describe('GermanCoureFormComponent', () => {
  let component: GermanCoureFormComponent;
  let fixture: ComponentFixture<GermanCoureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanCoureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GermanCoureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
