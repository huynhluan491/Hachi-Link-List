import { TestBed } from '@angular/core/testing';

import { ListlinkService } from './listlink.service';

describe('ListlinkService', () => {
  let service: ListlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
