import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/strategy/guards';

@Controller('user')
export class ProfileController {
  @UseGuards(JWTGuard)
  @Get('user-profile')
  getUserProfile(@Req() req: Request) {
    return req.user;
  }
}
