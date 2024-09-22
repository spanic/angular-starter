import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Environment } from '../models/environment.model';

const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  factory: () => environment,
});

export default ENVIRONMENT;
