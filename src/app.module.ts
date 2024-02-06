import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './talent/talent_profile/profile.module';
import { SendEmailModule } from './mailing_service/email.module';

@Module({
  imports: [AuthModule, PrismaModule, ProfileModule, SendEmailModule],
})
export class AppModule {}
