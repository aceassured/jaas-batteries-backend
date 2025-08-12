import {
  IsString,
  IsOptional,
  IsEmail
} from 'class-validator';

export class CreateUserDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  about?: string;
}
