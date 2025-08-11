import { Module } from '@nestjs/common';
import { DeviceDetailsService } from './device-details.service';
import { DeviceDetailsController } from './device-details.controller';

@Module({
  imports: [], // Or any other imports you might have
  controllers: [DeviceDetailsController],
  providers: [DeviceDetailsService],
  exports: [DeviceDetailsService], // Add the service to the exports array
})
export class DeviceDetailsModule {}