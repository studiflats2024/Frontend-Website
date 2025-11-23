import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityClubFormComponent } from './community-club-form.component';

describe('CommunityClubFormComponent', () => {
  let component: CommunityClubFormComponent;
  let fixture: ComponentFixture<CommunityClubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityClubFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityClubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
