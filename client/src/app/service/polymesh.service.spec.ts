import { TestBed } from '@angular/core/testing';

import { PolymeshService } from './polymesh.service';

describe('PolymeshService', () => {
  let service: PolymeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolymeshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
