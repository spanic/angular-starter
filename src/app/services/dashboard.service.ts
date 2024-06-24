import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GaugeData } from '../components/gauge-status/gauge-status.model';
import { DeviceData } from '../models/device-data.model';
import { Environment } from '../models/environment.model';
import { StatusesData } from '../models/statuses-data.model';
import ENVIRONMENT from '../shared/environment.token';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    @Inject(ENVIRONMENT) private env: Environment,
    private http: HttpClient
  ) {}

  fetchDevicesData(): Observable<DeviceData[]> {
    return this.http.get<DeviceData[]>(`${this.env.baseApiUrl}/devices`);
  }

  fetchStatusesData(): Observable<StatusesData> {
    return this.http.get<StatusesData>(`${this.env.baseApiUrl}/statuses`);
  }

  groupStatusesByName(statuses: StatusesData): GaugeData {
    const gaugeData: GaugeData = Object.entries(statuses ?? {})
      .sort(([, firstStatus], [, secondStatus]) => {
        if (firstStatus > secondStatus) return 1;
        if (firstStatus < secondStatus) return -1;
        return 0;
      })
      .reduce((acc, [, status]) => {
        if (!acc[status]) {
          acc[status] = 1;
        } else {
          acc[status] = ++acc[status];
        }
        return acc;
      }, {});
    return gaugeData;
  }
}
