import { Controller, Get } from '@nestjs/common';
import { GuestService } from './guest.service';

@Controller('/home')
export class GuestController {
  constructor(private guestService: GuestService) {}
  @Get('get-all-events')
  getAllEvents() {
    return this.guestService.getAllEvents();
  }
  @Get('get-all-articles')
  getAllArticles() {
    return this.guestService.getAllArticles();
  }
  @Get('get-all-success-stories')
  getAllSuccessStories() {
    return this.guestService.getAllSuccessStories();
  }
  @Get('get-all-partners')
  getAllPartners() {
    return this.guestService.getAllPartners();
  }
}
