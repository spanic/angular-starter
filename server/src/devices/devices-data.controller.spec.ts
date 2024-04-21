import { Test, TestingModule } from '@nestjs/testing';
import { DevicesDataController } from './devices-data.controller';
import { DevicesDataService } from './devices-data.service';
import { devicesData } from '../data/devices-data';

describe('DevicesDataController', () => {
  let devicesDataController: DevicesDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DevicesDataController],
      providers: [DevicesDataService],
    }).compile();

    devicesDataController = app.get<DevicesDataController>(
      DevicesDataController
    );
  });

  describe('root', () => {
    it('should return devices data', () => {
      expect(devicesDataController.getDevicesData()).toBe(devicesData);
    });
  });
});
