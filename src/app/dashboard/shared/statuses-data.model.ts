import { DeviceData } from './device-data.model';

enum Status {
  Operational = 'Operational',
  Warning = 'Warning',
  Error = 'Error',
  Offline = 'Offline',
  Unknown = 'Unknown',
}

interface StatusesData {
  [id: DeviceData['id']]: Status;
}

export { Status, StatusesData };
