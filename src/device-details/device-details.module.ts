import { Module } from '@nestjs/common';
import { DeviceDetailsController } from './device-details.controller';
import { DeviceDetailsService } from './device-details.service';

@Module({
  controllers: [DeviceDetailsController],
  providers: [DeviceDetailsService]
})
export class DeviceDetailsModule {}
