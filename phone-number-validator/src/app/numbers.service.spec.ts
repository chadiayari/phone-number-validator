import { TestBed } from '@angular/core/testing';

import { NumbersService } from './numbers.service';

describe('NumbersService', () => {
  let service: NumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
