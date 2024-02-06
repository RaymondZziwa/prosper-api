import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './strategy';
import { SendEmailService } from 'src/mailing_service/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy, SendEmailService],
})
export class AuthModule {}
