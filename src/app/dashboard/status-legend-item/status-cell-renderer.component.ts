import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DeviceData } from 'src/app/dashboard/shared/device-data.model';
import { Status } from 'src/app/dashboard/shared/statuses-data.model';
import { StatusLegendItemComponent } from './status-legend-item.component';

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
