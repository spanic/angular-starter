import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [StatusesModule, DevicesModule],
})
export class AppModule {}
