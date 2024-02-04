import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/strategy/guards';

@Controller('scout')
export class TalentProfileController {
  @UseGuards(JWTGuard)
  @Get('scout-profile')
  getUserProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JWTGuard)
  @Post('update-scout-profile')
  updateUserProfile() {
    return 'update talent profile';
  }

  @UseGuards(JWTGuard)
  @Post('scout-verification')
  verifyUser() {
    return 'talent verification';
  }

  @UseGuards(JWTGuard)
  @Post('update-password')
  updatePassword() {
    return 'password update';
  }

  @UseGuards(JWTGuard)
  @Post('deactivate-account')
  deactivateAccount() {
    return 'account has been deactivated';
  }

  @UseGuards(JWTGuard)
  @Post('scout-support')
  supportTalent() {
    return 'contact support team';
  }
}
