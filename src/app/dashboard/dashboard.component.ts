import { Component } from '@angular/core';
import { DeviceData, GaugeData, Status } from './dashboard.component.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public devicesData: DeviceData[] = [
    {
      id: 'c35b24d5-69ac-40c5-9591-9da525190b04',
      name: 'Cisco ASR-2550 UBB',
      ipAddress: '192.168.11.81',
      macAddress: 'd8:ba:eb:4b:01:b3',
      location: '4 Rockville St.Arvada, CO 80003',
      status: Status.Operational,
    },
    {
      id: '98758af7-aabd-42e5-bd0d-0cfeea23ff00',
      name: 'Huawei A-190 Core Switch',
      ipAddress: '176.12.111.2',
      macAddress: 'f6:8b:cb:76:2b:6a',
      location: '8486 Devon Avenue Cedar Rapids, IA 52402',
      status: Status.Warning,
    },
    {
      id: '64d20ce3-97b1-4ce0-ae22-f35aae78bb61',
      name: 'Zyxel 11-10 FE-router',
      ipAddress: '10.0.87.77',
      macAddress: 'f6:8b:cb:76:2b:6a',
      location: '24 Cambridge St.Suite 12 Saint Augustine, FL 32084',
      status: Status.Warning,
    },
  ];

  public gaugeData: GaugeData[] = [
    {
      status: 'Operational',
      color: 'green',
      ids: [
        '59e5b650-eec5-4ef4-a906-ca6cb818a940',
        '327d84bf-093f-44c7-b48c-75e7de97cec4',
        '5e6a73ba-02dd-408a-9f4f-7b79ae06e2fe',
      ],
    },
    {
      status: 'Warning',
      color: 'orange',
      ids: ['c12d1c7e-31fd-4ff8-b2a9-1a0fdb24cf0c'],
    },
    {
      status: 'Failure',
      color: 'red',
      ids: [
        'fb876f64-e3fd-40f5-8afa-4152ee0ff9f2',
        '2a9f8e07-ef41-4e9f-b60c-3e6f5094e6c5',
        '5e9bbd05-91f2-450e-9d12-419946dfe728',
        'b0309ac8-3387-4aec-a8b1-f55f1d10e837',
      ],
    },
  ];
}
