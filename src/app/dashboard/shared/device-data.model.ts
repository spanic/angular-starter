import { Status } from './statuses-data.model';

interface DeviceData {
  id: string;
  name?: string;
  manufacturer?: string;
  model?: string;
  firmwareVersion?: string;
  uptime?: number;
  macAddress?: string;
  ipAddress?: string;
  location?: string;
  status?: Status;
}

export { DeviceData };
