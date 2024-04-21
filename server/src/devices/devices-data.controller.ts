import { Controller, Get } from '@nestjs/common';
import { DeviceData } from 'src/shared/models/device-data.model';
import { DevicesDataService } from './devices-data.service';

@Controller('devices')
export class DevicesDataController {
  constructor(private readonly appService: DevicesDataService) {}

  @Get()
  async getDevicesData(): Promise<DeviceData[]> {
    return await this.appService.getDevicesData();
  }
}
