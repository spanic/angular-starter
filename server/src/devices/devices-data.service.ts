import { Injectable } from '@nestjs/common';
import { DeviceData } from 'src/shared/models/device-data.model';
import { RxDBService } from 'src/database/rxdb.service';

@Injectable()
export class DevicesDataService {
  constructor(private rxDbService: RxDBService) {}

  async getDevicesData(): Promise<DeviceData[]> {
    const devices = await this.rxDbService.devicesDB.collections[
      'devices_collection'
    ]
      .find()
      .exec();
    return devices;
  }
}
