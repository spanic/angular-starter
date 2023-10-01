import { DeviceData } from './device-data.model';

enum Status {
  Operational = 'Operational',
  Warning = 'Warning',
  Error = 'Error',
  Offline = 'Offline',
  Unknown = 'Unknown',
}

const StatusColorMap: { [status: string]: string } = {
  [Status.Operational]: 'green',
  [Status.Error]: 'red',
  [Status.Warning]: 'orange',
  [Status.Offline]: 'grey',
  [Status.Unknown]: 'lightblue',
};

interface StatusesData {
  [id: DeviceData['id']]: Status;
}

export { Status, StatusesData, StatusColorMap };
