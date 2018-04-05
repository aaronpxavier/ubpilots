import { TestBed, inject } from '@angular/core/testing';
import { BaseService } from './base-service.service';

describe('BaseServiceService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });
    service = TestBed.get(BaseService);
  });

  it('should be created', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));

  it('should have base url defined', () => {
    expect(service.getBaseURL()).toBeTruthy();
  });
});
