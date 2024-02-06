import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/strategy/guards';

@UseGuards(JWTGuard)
@Controller('scout')
export class TalentProfileController {
  @Get('scout-profile')
  getUserProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('update-scout-profile')
  updateUserProfile() {
    return 'update talent profile';
  }

  @Post('scout-verification')
  verifyUser() {
    return 'talent verification';
  }

  @Post('update-password')
  updatePassword() {
    return 'password update';
  }

  @Post('deactivate-account')
  deactivateAccount() {
    return 'account has been deactivated';
  }

  @Post('scout-support')
  supportTalent() {
    return 'contact support team';
  }
}
