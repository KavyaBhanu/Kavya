import { TestBed } from '@angular/core/testing';

import { AddressoneService } from './addressone.service';

describe('AddressoneService', () => {
  let service: AddressoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
