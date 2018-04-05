import { TestBed, inject } from '@angular/core/testing';

import { LogbookService } from './logbook.service';

describe('LogbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogbookService]
    });
  });

  it('should be created', inject([LogbookService], (service: LogbookService) => {
    expect(service).toBeTruthy();
  }));
});
