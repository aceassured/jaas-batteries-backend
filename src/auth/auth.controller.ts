import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('send-sms')
  async sendSMS(@Body() body: { phoneNumber: string }): Promise<any> {
    return this.authService.sendOtp(body.phoneNumber);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phone') phone: string, @Body('otp') otp: string) {
    return this.authService.verifyOtp(phone, otp);
  }

  @Get('fetch-user-details/:id')
  async fetchingUserDetails(@Param('id', ParseIntPipe) id: number) {
    return this.authService.fetchingUserDetails(id);
  }

  @Put('edit-user-details/:id')
  async editUserDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: CreateUserDto,
  ) {
    return this.authService.editUserDetails(id, userDto);
  }
}
