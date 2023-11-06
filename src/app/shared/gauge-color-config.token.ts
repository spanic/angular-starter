import { InjectionToken } from '@angular/core';
import { Status } from '../models/statuses-data.model';

const GAUGE_COLOR_CONFIG = new InjectionToken<{ [status: string]: string }>(
  'GAUGE_COLOR_CONFIG',
  {
    factory: () => {
      return {
        [Status.Operational]: 'green',
        [Status.Error]: 'red',
        [Status.Warning]: 'orange',
        [Status.Offline]: 'grey',
        [Status.Unknown]: 'lightblue',
      };
    },
  }
);

export { GAUGE_COLOR_CONFIG };
