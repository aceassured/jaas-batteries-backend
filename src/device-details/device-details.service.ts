import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQrDeviceInfoDto } from './dto/create-device-details-dto';
import { catchBlock } from '../common/catch-block';
import { CreateDeviceComplaintDto } from './dto/create-device-complaint.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  // async addDeviceDetails(
  //   body: CreateQrDeviceInfoDto,
  //   qrCodeData: { serialNumber: string; purchaseDate: string },
  //   userId: number,
  // ) {
  //   try {
  //     const { serialNumber, purchaseDate } = body;

  //     // Check if serial number and purchase date match QR code response
  //     if (
  //       qrCodeData.serialNumber !== serialNumber ||
  //       qrCodeData.purchaseDate !== purchaseDate
  //     ) {
  //       throw new BadRequestException(
  //         'Device details do not match the QR code',
  //       );
  //     }

  //     await this.prisma.qrDeviceInfo.create({
  //       data: {
  //         ...body,
  //         user: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //     });
  //     return { message: 'New device added successfully!' };
  //   } catch (err) {
  //     catchBlock(err);
  //   }
  // }

  async fetchAllDeviceDetails(id: number) {
    try {
      const allDevices = await this.prisma.qrDeviceInfo.findMany({
        where: {
          user: {
            id,
          },
        },
      });

      return {
        message: `Fetched all the device details of user ${id}`,
        allDevices,
      };
    } catch (err) {
      catchBlock(err);
    }
  }

  async createComplaint(dto: CreateDeviceComplaintDto) {
    try {
      const {
        userId,
        deviceId,
        complaintType,
        description,
        serialNumber,
      } = dto;

      // 1. Verify device with serialNumber & purchaseDate
      const device = await this.prisma.qrDeviceInfo.findFirst({
        where: {
          id:deviceId
        },
      });

      if (!device) {
        throw new NotFoundException(
          'No device found with given serial number and purchase date',
        );
      }

      // 2. Generate unique ticket number
      const timestamp = Date.now().toString().slice(-6);
      const suffix = uuidv4().slice(0, 5).toUpperCase();
      const ticketNumber = `TICKET-${serialNumber.slice(-4)}-${timestamp}-${suffix}`;

      // 3. Save complaint
      const complaint = await this.prisma.deviceComplaint.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          device: {
            connect: {
              id: deviceId,
            },
          },
          complaintType,
          description,
          ticketNumber,
          raisedAt: new Date(),
          status: 'Pending',
        },
      });

      return { message: 'New complaint registered successfully', complaint };
    } catch (err) {
      catchBlock(err);
    }
  }

  async fetchAllComplaints(id: number) {
    try {
      const allComplaints = await this.prisma.deviceComplaint.findMany({
        where: {
          device: {
            id: id,
          },
        },
      });

      return {
        message: `Fetched all the device complaint details of device ${id}`,
        allComplaints,
      };
    } catch (err) {
      catchBlock(err);
    }
  }

  async registerDevice(qrCodeId: string,userId:number) {
    try {
      const battery = await this.prisma.battery.findFirst({
        where:{
          qr_code_id:qrCodeId
        }
      })

      if(!battery) {
        throw new BadRequestException('No battery found with the given qr code id')
      }

      await this.prisma.qrDeviceInfo.create({
        data:{
         user:{
          connect:{
            id:userId
          }
         },
         battery:{
          connect:{
            id:battery.id
          }
         }
        }
      })

      return {message:'New battery registed successfully!'}
    } catch (error) {
     catchBlock(error)
    }
  }


}
