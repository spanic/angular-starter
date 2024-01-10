import { Status } from 'src/app/models/statuses-data.model';

type GaugeData = {
  [status in Status]?: number;
};

export { GaugeData };
