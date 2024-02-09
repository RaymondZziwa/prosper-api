import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'auth/strategy/guards';

@UseGuards(JWTGuard)
@Controller('/support')
export class GuestController {
  constructor() {}
  @Get('profile')
  getSupportProfile() {
    return 'support profile';
  }
  @Get('get-all-players')
  getAllPlayers() {
    return 'all players';
  }
  @Get('get-all-scouts')
  getAllScouts() {
    return 'all scouts';
  }
  @Get('player-verification')
  playerVerification() {
    return 'verify players';
  }
  @Get('scout-verification')
  scoutVerification() {
    return 'verify scouts';
  }
  @Get('manage-events')
  getEvents() {
    return 'manage events';
  }
  @Get('manage-issues')
  getSubmittedIssues() {
    return 'manage pro players';
  }
  @Get('manage-player-shortlists')
  getProPlayers() {
    return 'manage player shortlists';
  }
}
