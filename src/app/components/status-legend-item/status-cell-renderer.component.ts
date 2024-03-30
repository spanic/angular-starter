import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusLegendItemComponent } from './status-legend-item.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DeviceData } from 'src/app/models/device-data.model';
import { Status } from 'src/app/models/statuses-data.model';

@Component({
  selector: 'app-status-cell-renderer',
  templateUrl: './status-legend-item.component.html',
  styleUrls: ['./status-legend-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCellRendererComponent
  extends StatusLegendItemComponent
  implements ICellRendererAngularComp
{
  agInit(params: ICellRendererParams<DeviceData[], Status, any>): void {
    this.status = params.value;
  }

  // AgGrid will re-init the component when data changes.
  // Returning "true" unfortunately will not work due to internal table virtualization logic
  refresh(): boolean {
    return false;
  }
}
