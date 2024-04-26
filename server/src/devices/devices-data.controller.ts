import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeviceData } from 'src/shared/models/device-data.model';
import { DevicesDataService } from './devices-data.service';

@ApiTags('Devices & statuses')
@Controller('devices')
export class DevicesDataController {
  constructor(private readonly appService: DevicesDataService) {}

  @Get()
  @ApiBearerAuth()
  async getDevicesData(): Promise<DeviceData[]> {
    return await this.appService.getDevicesData();
  }
}
