import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './user_profile/profile.module';

@Module({
  imports: [AuthModule, PrismaModule, ProfileModule],
})
export class AppModule {}
