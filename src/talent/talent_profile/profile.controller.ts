import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/strategy/guards';
import { ProfileService } from './profile.service';
import { GetTalentProfileDto, IssueSupport, ResetPasswordDto } from './dto';

@UseGuards(JWTGuard)
@Controller('talent')
export class TalentProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('talent-profile')
  getTalentProfile(@Body() dto: GetTalentProfileDto) {
    return this.profileService.getTalentProfile(dto);
  }

  @Post('update-talent-profile')
  updateUserProfile() {
    return 'update talent profile';
  }

  @Post('talent-verification')
  verifyUser() {
    return 'talent verification';
  }

  @Post('update-password')
  updatePassword(@Body() dto: ResetPasswordDto) {
    return this.profileService.resetTalentAccountPassword(dto);
  }

  @Post('deactivate-account')
  deactivateAccount(@Body() dto: GetTalentProfileDto) {
    return this.profileService.deactivateAccount(dto);
  }

  @Post('talent-support')
  supportTalent(@Body() dto: IssueSupport) {
    return this.profileService.createIssue(dto);
  }

  @Post('past-issues-history')
  retrievePastIssuesHistory() {
    return 'Past issues history';
  }
}