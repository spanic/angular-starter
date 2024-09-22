import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Status } from 'src/app/dashboard/shared/statuses-data.model';

@Component({
  selector: 'app-status-legend-item',
  templateUrl: './status-legend-item.component.html',
  styleUrls: ['./status-legend-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusLegendItemComponent {
  @HostBinding('class')
  private className = 'app-status-legend-item';

  @Input()
  status: Status;
}
