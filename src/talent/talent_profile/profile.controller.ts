import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'auth/strategy/guards';
import { ProfileService } from './profile.service';
import { GetTalentProfileDto, IssueSupportDto, ResetPasswordDto } from './dto';

@UseGuards(JWTGuard)
@Controller('talent')
export class TalentProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('talent-profile')
  getTalentProfile(@Body() dto: GetTalentProfileDto) {
    return this.profileService.getTalentProfile(dto);
  }

  @Post('complete-talent-profile')
  completeTalentProfile() {
    return 'update talent profile';
  }

  @Post('update-talent-profile')
  updateTalentProfile() {
    return 'update talent profile';
  }

  @Post('talent-email-verification')
  verifyTalentEmail() {
    return 'talent email verification';
  }
  @Post('talent-contact-verification')
  verifyTalentContact() {
    return 'talent email verification';
  }

  @Post('talent-profile-verification')
  verifyUser() {
    return 'talent profile verification';
  }

  @Post('update-password')
  updatePassword(@Body() dto: ResetPasswordDto) {
    return this.profileService.updateTalentAccountPassword(dto);
  }

  @Post('deactivate-account')
  deactivateAccount(@Body() dto: GetTalentProfileDto) {
    return this.profileService.deactivateAccount(dto);
  }

  @Post('talent-support')
  supportTalent(@Body() dto: IssueSupportDto) {
    return this.profileService.createIssue(dto);
  }
}
