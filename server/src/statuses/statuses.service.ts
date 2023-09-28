import { Injectable } from '@nestjs/common';
import { devicesData } from 'src/shared/data/devices-data';
import { Status } from 'src/shared/models/device-data.model';
import { StatusesData } from 'src/shared/models/statuses-data.model';

@Injectable()
export class StatusesService {
  findAll(): StatusesData {
    const enumKeys = Object.keys(Status);

    const randomizedStatusesData = devicesData.reduce((acc, deviceData) => {
      const randomEnumKey =
        enumKeys[Math.floor(Math.random() * enumKeys.length)];
      acc[deviceData.id] = Status[randomEnumKey];
      return acc;
    }, {} as StatusesData);

    return randomizedStatusesData;
  }
}
