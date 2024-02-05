import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TalentProfileController } from './profile.controller';

@Module({
  controllers: [TalentProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
