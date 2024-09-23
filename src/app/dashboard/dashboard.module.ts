import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DataTableComponent } from './data-table/data-table.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { GaugeStatusComponent } from './gauge-status/gauge-status.component';
import { StatusCellRendererComponent } from './status-legend-item/status-cell-renderer.component';
import { StatusLegendItemComponent } from './status-legend-item/status-legend-item.component';

@NgModule({
  imports: [
    AgGridModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    DataTableComponent,
    EditDeviceComponent,
    GaugeStatusComponent,
    StatusLegendItemComponent,
    StatusCellRendererComponent,
    DashboardComponent,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
