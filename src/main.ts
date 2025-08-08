import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    exceptionFactory: (errors) => {
      const firstError=errors[0]
      const constraints=firstError?.constraints
      const firstMessage=constraints?Object.values(constraints)[0]:'validation failed'
      return new BadRequestException(firstMessage)
    }
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();