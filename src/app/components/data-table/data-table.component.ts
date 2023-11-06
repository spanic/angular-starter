import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { GridOptions, RowSelectedEvent } from 'ag-grid-community';
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

  @Input()
  public data: DeviceData[];

  @Output()
  public selectRow = new EventEmitter<DeviceData>();

  public gridOptions: GridOptions = {
    domLayout: 'autoHeight',
    suppressCellFocus: true,
    rowClass: 'data-table__row',
    columnDefs: [
      { field: 'name' },
      { field: 'macAddress', headerName: 'MAC Address' },
      { field: 'ipAddress', headerName: 'IP Address' },
      { field: 'location' },
      { field: 'status' },
    ],
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    rowSelection: 'single',
    rowMultiSelectWithClick: true,
    animateRows: true,
    onRowSelected: (event) => this.onRowSelected(event),
  };

  public onRowSelected(event: RowSelectedEvent<DeviceData>): void {
    const { node: row, data } = event;
    const { id } = row;
    const isSelected = row.isSelected();

    if (id === this._selectedRowId && !isSelected) {
      this.selectRow.emit(undefined);
    } else if (isSelected) {
      this._selectedRowId = id;
      this.selectRow.emit(data);
    }
  }

  private _selectedRowId: string | undefined;
}
