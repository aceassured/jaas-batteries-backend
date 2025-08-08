// dto/create-device-complaint.dto.ts
import {
  IsString,
  IsUUID,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateDeviceComplaintDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  deviceId: number;

  @IsNotEmpty()
  @IsString()
  complaintType: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: string;
}
