import { TestBed } from '@angular/core/testing';

import { RestroomService } from './restroom.service';

describe('RestroomService', () => {
  let service: RestroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
