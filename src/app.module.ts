import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProfileModule } from 'talent/talent_profile/profile.module';
import { SendEmailModule } from 'mailing_service/email.module';
import { SupportModule } from 'support/support.module';
import { GuestModule } from 'Guest/guest.module';
import { TalentDashboardModule } from 'talent/dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProfileModule,
    SendEmailModule,
    SupportModule,
    GuestModule,
    TalentDashboardModule,
  ],
})
export class AppModule {}
