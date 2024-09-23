import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [UnauthorizedInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: UnauthorizedInterceptor = TestBed.inject(
      UnauthorizedInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
