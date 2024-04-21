import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RxCollection, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { DeviceData, Status } from '../shared/models/device-data.model';
import { devicesData } from '../data/devices-data';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RxDBService implements OnApplicationBootstrap {
  devicesDB: RxDatabase<{ devices_collection: RxCollection<DeviceData> }>;
  async onApplicationBootstrap() {
    addRxPlugin(RxDBDevModePlugin);

    this.devicesDB = await createRxDatabase({
      name: 'devices_db',
      storage: getRxStorageMemory(),
    });

    // TODO: generate JSON Schema automatically via https://github.com/vega/ts-json-schema-generator
    const deviceSchema = {
      version: 0,
      primaryKey: 'id',
      type: 'object',
      properties: {
        id: {
          type: 'string',
          maxLength: 100,
        },
        name: {
          type: 'string',
        },
        manufacturer: {
          type: 'string',
        },
        model: {
          type: 'string',
        },
        uptime: {
          type: 'integer',
          minimum: 0,
        },
        firmwareVersion: {
          type: 'string',
        },
        macAddress: {
          type: 'string',
        },
        ipAddress: {
          type: 'string',
          format: 'ipv4',
        },
        location: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: [
            Status.Offline,
            Status.Operational,
            Status.Warning,
            Status.Error,
            Status.Unknown,
          ],
        },
      },
      required: ['id', 'name'],
    };

    await this.devicesDB.addCollections({
      devices_collection: {
        schema: deviceSchema,
      },
    });

    const devicesCollection = this.devicesDB['devices_collection'];

    await devicesCollection.bulkInsert(
      devicesData.map((device) => {
        return { ...device, id: uuidv4() };
      })
    );
  }
}
