import {
  Component,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { DeviceData } from '../../models/device-data.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent {
  @HostBinding('class')
  hostElementClass = 'data-table';

  public columnDefs: ColDef<DeviceData>[] = [
    { field: 'name' },
    { field: 'macAddress', headerName: 'MAC Address' },
    { field: 'ipAddress', headerName: 'IP Address' },
    { field: 'location' },
    { field: 'status' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  @Input()
  public data: DeviceData[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    // this.agGrid.rowData = this.data;
  }
}
