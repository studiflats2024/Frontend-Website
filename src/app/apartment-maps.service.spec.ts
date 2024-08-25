import { TestBed } from '@angular/core/testing';

import { ApartmentMapsService } from './apartment-maps.service';

describe('ApartmentMapsService', () => {
  let service: ApartmentMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
