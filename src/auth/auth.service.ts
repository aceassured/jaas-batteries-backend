import { Injectable, Logger } from '@nestjs/common';
import * as twilio from 'twilio';
import { PrismaService } from '../prisma/prisma.service';
import * as dotenv from 'dotenv';
import { WHITELISTED_NUMBERS } from '../common/whitelist';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private twilioClient: twilio.Twilio;

  constructor(private readonly prisma: PrismaService) {
    this.twilioClient = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }
  async sendOtp(phoneNumber: string): Promise<any> {
    try {
      if (!WHITELISTED_NUMBERS.includes(phoneNumber)) {
        this.logger.warn(`Phone number ${phoneNumber} is not whitelisted`);
        return {
          success: false,
          message: 'Phone number is not whitelisted',
        };
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Calculate 2-minute expiry time from now
      const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 mins in ms

      // Send the OTP via Twilio
      const result = await this.twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      // Save or update user with OTP and expiry
      await this.prisma.user.upsert({
        where: { phone: phoneNumber },
        update: { otp, otpExpiresAt },
        create: {
          phone: phoneNumber,
          otp,
          otpExpiresAt,
        },
      });

      this.logger.log(`OTP sent to ${phoneNumber}, SID: ${result.sid}`);
      return {
        success: true,
        message: 'OTP sent successfully',
        sid: result.sid,
      };
    } catch (error) {
      this.logger.error(`Failed to send OTP: ${error.message}`, error.stack);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { phone: phoneNumber },
      });
  
      // User not found
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
  
      // No OTP or expiry stored
      if (!user.otp || !user.otpExpiresAt) {
        return {
          success: false,
          message: 'OTP not requested or already used',
        };
      }
  
      const now = new Date();
  
      // Check if OTP is expired
      if (user.otpExpiresAt < now) {
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.',
        };
      }
  
      // Check if OTP matches
      if (user.otp !== otp) {
        return {
          success: false,
          message: 'Invalid OTP. Please try again.',
        };
      }
  
      // OTP is valid — you can clear it or mark user as verified here
      await this.prisma.user.update({
        where: { phone: phoneNumber },
        data: {
          otp: null,
          otpExpiresAt: null,
        },
      });
  
      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } catch (error) {
      this.logger.error(`OTP verification failed: ${error.message}`, error.stack);
      return {
        success: false,
        error: error.message,
      };
    }
  }  

}
