import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceData } from '../models/device-data.model';
import { StatusesData } from '../models/statuses-data.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  fetchDevicesData(): Observable<DeviceData[]> {
    return this.http.get<DeviceData[]>('http://localhost:4201/devices');
  }

  fetchStatusesData(): Observable<StatusesData> {
    return this.http.get<StatusesData>('http://localhost:4201/statuses');
  }
}
