import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('send-sms')
  async sendSMS(
    @Body() body: { phoneNumber: string },
  ): Promise<any> {
    return this.authService.sendOtp(body.phoneNumber)
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('phone') phone: string,
    @Body('otp') otp: string,
  ) {
    return this.authService.verifyOtp(phone, otp);
  }
  
}