import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, interval, startWith, switchMap } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { StatusesData } from 'src/app/dashboard/shared/statuses-data.model';
import { GaugeData } from './gauge-status/gauge-status.model';
import { DeviceData } from './shared/device-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public gaugeData: GaugeData;

  public devices: DeviceData[];

  public selectedDevice: DeviceData;

  private _destroyRef = inject(DestroyRef);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    combineLatest([
      this.dashboardService.fetchDevicesData(),
      interval(2000).pipe(
        startWith(0),
        switchMap(() => this.dashboardService.fetchStatusesData())
      ),
    ])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([devices, statuses]: [DeviceData[], StatusesData]) => {
        this.devices = devices.map((device) => {
          device.status = statuses[device.id];
          return device;
        });
        this.gaugeData = this.dashboardService.groupStatusesByName(statuses);
      });
  }

  public onSelectRow(deviceData: DeviceData): void {
    this.selectedDevice = deviceData;
  }
}
