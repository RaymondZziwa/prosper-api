import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'auth/strategy/guards';
import { SupportService } from './support.service';
import {
  getSupportPersonnelProfileDto,
  manageArticlesDto,
  manageEventsDto,
  manageIssueSupportDto,
  managePartnersDto,
  manageSuccessStoryDto,
  manageTalentInquiries,
  saveNewArticleDto,
  saveNewEventDto,
  saveNewPartnerDto,
  saveNewSuccessStoryDto,
} from './dto/support.dto';

@UseGuards(JWTGuard)
@Controller('/support')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Get('profile')
  getSupportProfile(@Body() dto: getSupportPersonnelProfileDto) {
    return this.supportService.getSupportTeamPersonnelProfile(dto);
  }
  @Get('get-all-talents')
  getAllPlayers() {
    return this.supportService.getAllTalents();
  }
  @Get('get-all-scouts')
  getAllScouts() {
    return this.supportService.getAllScouts();
  }
  @Get('player-verification')
  playerVerification() {
    return 'verify players';
  }
  @Get('scout-verification')
  scoutVerification() {
    return 'verify scouts';
  }

  @Get('get-all-partners')
  getAllPartners() {
    return this.supportService.getAllPartners();
  }
  @Post('save-new-partner')
  saveNewPartner(@Body() dto: saveNewPartnerDto) {
    return this.supportService.saveNewPartner(dto);
  }
  @Get('delete-partner')
  deletePartner(@Body() dto: managePartnersDto) {
    return this.supportService.deletePartner(dto);
  }

  @Get('get-all-events')
  getAllEvents() {
    return this.supportService.getAllEvents();
  }
  @Post('save-new-event')
  saveNewEvent(@Body() dto: saveNewEventDto) {
    return this.supportService.saveNewEvent(dto);
  }
  @Post('edit-event')
  updateEvent(@Body() dto: manageEventsDto) {
    return this.supportService.editEvent(dto);
  }
  @Post('delete-event')
  deleteEvent(@Body() dto: manageEventsDto) {
    return this.supportService.deleteEvent(dto);
  }

  @Get('get-all-articles')
  getAllArticles() {
    return this.supportService.getAllArticles();
  }
  @Post('save-new-article')
  saveNewArticle(@Body() dto: saveNewArticleDto) {
    return this.supportService.saveNewArticle(dto);
  }
  @Post('edit-article')
  updateArticle(@Body() dto: manageArticlesDto) {
    return this.supportService.editArticle(dto);
  }
  @Post('delete-event')
  deleteArticle(@Body() dto: manageArticlesDto) {
    return this.supportService.deleteArticle(dto);
  }

  @Get('get-all-success-stories')
  getEvents() {
    return this.supportService.getAllSuccessStories();
  }
  @Post('save-new-success-story')
  saveNewSuccessStory(@Body() dto: saveNewSuccessStoryDto) {
    return this.supportService.saveNewSuccessStory(dto);
  }
  @Post('edit-success-story')
  updateSuccessStory(@Body() dto: manageSuccessStoryDto) {
    return this.supportService.editSuccessStory(dto);
  }
  @Post('delete-success-story')
  deleteSuccessStory(@Body() dto: manageSuccessStoryDto) {
    return this.supportService.deleteSuccessStory(dto);
  }

  @Get('get-all-issues')
  getAllSubmittedIssues() {
    return this.supportService.getAllSubmittedIssues();
  }
  @Post('respond-to-issue')
  respondToIssue(@Body() dto: manageIssueSupportDto) {
    return this.supportService.respondToIssue(dto);
  }

  @Get('get-all-talent-inquiries')
  getAllTalentInquiries() {
    return this.supportService.getAllTalentInquiries();
  }
  @Post('respond-to-talent-inquiries')
  respondToTalentInquiries(@Body() dto: manageTalentInquiries) {
    return this.supportService.respondToTalentInquiry(dto);
  }
}
