import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSiderComponent } from './app-sider.component';

describe('AppSiderComponent', () => {
  let component: AppSiderComponent;
  let fixture: ComponentFixture<AppSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
