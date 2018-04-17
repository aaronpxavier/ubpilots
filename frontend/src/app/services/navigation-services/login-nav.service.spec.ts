import { TestBed, inject } from '@angular/core/testing';

import { LoginNavService } from './login-nav.service';

describe('LoginNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginNavService]
    });
  });

  it('should be created', inject([LoginNavService], (service: LoginNavService) => {
    expect(service).toBeTruthy();
  }));
});
