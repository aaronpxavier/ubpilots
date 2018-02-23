import { TestBed, inject } from '@angular/core/testing';

import { HideNavMenuService } from './hide-nav-menu.service';

describe('HideNavMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HideNavMenuService]
    });
  });

  it('should be created', inject([HideNavMenuService], (service: HideNavMenuService) => {
    expect(service).toBeTruthy();
  }));
});
