import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [StatusesModule, DevicesModule, DatabaseModule],
})
export class AppModule {}
