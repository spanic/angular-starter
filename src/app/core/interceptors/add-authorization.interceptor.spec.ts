import { TestBed } from '@angular/core/testing';

import { AddAuthorizationInterceptor } from './add-authorization.interceptor';

describe('AuthorizationInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AddAuthorizationInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AddAuthorizationInterceptor = TestBed.inject(
      AddAuthorizationInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
