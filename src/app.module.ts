import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DeviceDetailsModule } from './device-details/device-details.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [AuthModule,PrismaModule, DeviceDetailsModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
