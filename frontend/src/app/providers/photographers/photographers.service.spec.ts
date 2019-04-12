import { TestBed } from '@angular/core/testing';

import { PhotographersService } from './photographers.service';

describe('PhotographersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotographersService = TestBed.get(PhotographersService);
    expect(service).toBeTruthy();
  });
});
