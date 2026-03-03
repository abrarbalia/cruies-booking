import { TestBed } from '@angular/core/testing';

import { Cruise } from './cruise';

describe('Cruise', () => {
  let service: Cruise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cruise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
