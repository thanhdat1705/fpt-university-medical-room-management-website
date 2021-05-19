import { TestBed } from '@angular/core/testing';

import { GeneralHelperService } from './general-helper.service';

describe('GeneralHelperService', () => {
  let service: GeneralHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
