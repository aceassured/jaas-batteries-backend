// src/device-details/dto/create-qr-device-info.dto.ts
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsObject,
  IsEmail,
} from 'class-validator';

export class CreateQrDeviceInfoDto {
  @IsString()
  serialNumber: string;

  @IsDateString()
  purchaseDate: string; // send in ISO format (e.g., "2025-08-07T12:34:56Z")

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  warrantyStatus?: string;

  @IsOptional()
  @IsInt()
  warrantyPeriod?: number;

  @IsOptional()
  @IsString()
  deviceType?: string;

  @IsOptional()
  @IsString()
  supportContact?: string;

  @IsOptional()
  @IsString()
  firmwareVersion?: string;

  @IsOptional()
  @IsString()
  registeredTo?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsObject()
  extraInfo?: Record<string, any>;
}
