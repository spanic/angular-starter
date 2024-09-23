import { TestBed } from '@angular/core/testing';

import { NavigationHelperSevice } from './navigation-helper.service';

describe('NavigationHistoryService', () => {
  let service: NavigationHelperSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationHelperSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
