import { TestBed, inject } from '@angular/core/testing';

import { HideFooterServiceService } from './hide-footer-service.service';

describe('HideFooterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HideFooterServiceService]
    });
  });

  it('should be created', inject([HideFooterServiceService], (service: HideFooterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
