import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  GetRowIdParams,
  GridOptions,
  RowSelectedEvent,
} from 'ag-grid-community';
import { DeviceData } from '../../models/device-data.model';
import { StatusCellRendererComponent } from '../status-legend-item/status-cell-renderer.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent {
  @HostBinding('class')
  hostElementClass = 'data-table';

  @ViewChild('grid') grid: AgGridAngular;

  private _data: DeviceData[];

  @Input()
  public set data(data: DeviceData[]) {
    this._data = data;
    // manually triggers cells update, without this line AgGrid will update data only if it's scrolled out of the view
    // or if filtering/sorting applied. I suppose it's because of internal virtualization / change detection logic
    this.grid?.api.refreshCells();
  }

  public get data() {
    return this._data;
  }

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
      { field: 'status', cellRenderer: StatusCellRendererComponent },
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
    getRowId: (params: GetRowIdParams<DeviceData>) => params.data.id,
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
