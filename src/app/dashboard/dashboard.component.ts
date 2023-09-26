import { Component } from '@angular/core';
import { GaugeData } from './dashboard.component.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public data: GaugeData = [
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
