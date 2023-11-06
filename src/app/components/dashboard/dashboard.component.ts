import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, interval, startWith, switchMap } from 'rxjs';
import { StatusesData } from 'src/app/models/statuses-data.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DeviceData } from '../../models/device-data.model';
import { GaugeData } from '../gauge-status/gauge-status.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public gaugeData: GaugeData[] = [
    {
      status: 'Operational',
      qty: 3,
    },
    {
      status: 'Warning',
      qty: 1,
    },
    {
      status: 'Error',
      qty: 4,
    },
  ];

  public devices: DeviceData[];

  public selectedDevice: DeviceData;

  private _destroyRef = inject(DestroyRef);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    combineLatest([
      this.dashboardService.fetchDevicesData(),
      interval(1000).pipe(
        startWith(0),
        switchMap(() => this.dashboardService.fetchStatusesData())
      ),
    ])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([devices, statuses]: [DeviceData[], StatusesData]) => {
        this.devices = devices;
      });
  }

  public onSelectRow(deviceData: DeviceData): void {
    this.selectedDevice = deviceData;
  }
}
