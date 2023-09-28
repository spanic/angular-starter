import { Injectable } from '@nestjs/common';
import { DeviceData } from 'src/shared/models/device-data.model';
import { devicesData } from '../shared/data/devices-data';

@Injectable()
export class DevicesDataService {
  getDevicesData(): DeviceData[] {
    return devicesData;
  }
}
