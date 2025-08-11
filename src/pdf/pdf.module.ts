import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { DeviceDetailsModule } from '../device-details/device-details.module'; // Import the module

@Module({
  controllers: [PdfController],
  providers: [PdfService],
  imports: [DeviceDetailsModule], // Make sure you have this line
})
export class PdfModule {}