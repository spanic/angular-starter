import { Status } from 'src/app/dashboard/shared/statuses-data.model';

type GaugeData = {
  [status in Status]?: number;
};

export { GaugeData };
