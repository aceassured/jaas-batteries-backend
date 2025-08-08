// import { Controller, Post, Body, Param, ParseIntPipe, Get } from '@nestjs/common';
// import { DeviceDetailsService } from './device-details.service';
// import { CreateQrDeviceInfoDto } from './dto/create-device-details-dto';

// @Controller('device-details')
// export class DeviceDetailsController {
//   constructor(private readonly deviceDetailsService: DeviceDetailsService) {}


//   @Post('add-device/:userId')
//   async addDeviceDetails(@Body() dto: CreateQrDeviceInfoDto, qrCodeData: { serialNumber: string; purchaseDate: string },@Param('userId',ParseIntPipe) userId:number) {
//     return this.deviceDetailsService.addDeviceDetails(dto,qrCodeData,userId);
//   }

//   @Get('fetch-devices/:userId')
//   async fetchAllDevices(@Param('userId',ParseIntPipe) userId:number) {
//     return this.deviceDetailsService.fetchAllDeviceDetails(userId)
//   }

// }


import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { DeviceDetailsService } from './device-details.service';
// import { CreateQrDeviceInfoDto } from './dto/create-device-details-dto';
import { CreateDeviceComplaintDto } from './dto/create-device-complaint.dto';

@Controller('device-details')
export class DeviceDetailsController {
  constructor(private readonly deviceDetailsService: DeviceDetailsService) {}

  // @Post('add-device/:userId')
  // async addDeviceDetails(
  //   @Body() dto: CreateQrDeviceInfoDto,
  //   qrCodeData: { serialNumber: string; purchaseDate: string },
  //   @Param('userId', ParseIntPipe) userId: number,
  // ) {
  //   return this.deviceDetailsService.addDeviceDetails(
  //     dto,
  //     qrCodeData,
  //     userId,
  //   );
  // }

  @Get('fetch-devices/:userId')
  async fetchAllDevices(@Param('userId', ParseIntPipe) userId: number) {
    return this.deviceDetailsService.fetchAllDeviceDetails(userId);
  }

  @Post('create-complaint')
  async createComplaint(@Body() dto: CreateDeviceComplaintDto) {
    return this.deviceDetailsService.createComplaint(dto);
  }

  @Get('fetch-complaints/:deviceId')
  async fetchAllComplaints(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.deviceDetailsService.fetchAllComplaints(deviceId);
  }

  @Post('register-device/:userId/:qrCodeId')
  async registerDevice(@Param('userId',ParseIntPipe) userId:number,@Param('qrCodeId') qrCodeId:string) {
    return this.deviceDetailsService.registerDevice(qrCodeId,userId)
  }


}
