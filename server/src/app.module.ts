import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [
    StatusesModule,
    DevicesModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
