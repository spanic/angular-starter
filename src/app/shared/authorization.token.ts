import { InjectionToken } from '@angular/core';

const ACCESS_TOKEN_STORAGE_KEY = new InjectionToken<string>(
  'ACCESS_TOKEN_STORAGE_KEY',
  {
    factory: () => 'access_token',
  }
);

export default ACCESS_TOKEN_STORAGE_KEY;
