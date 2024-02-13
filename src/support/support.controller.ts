import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'auth/strategy/guards';
import { SupportService } from './support.service';

@UseGuards(JWTGuard)
@Controller('/support')
export class SupportController {
  constructor(private supportService: SupportService) {}
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
  @Get('get-all-events')
  getEvents() {
    return 'manage events';
  }
  @Get('update-event')
  updateEvents() {
    return 'update events';
  }
  @Get('get-all-issues')
  getSubmittedIssues() {
    return 'manage pro players';
  }
  @Get('update-issue')
  updateIssue() {
    return 'update issues';
  }
  @Get('manage-player-shortlists')
  getProPlayers() {
    return 'manage player shortlists';
  }
}
