import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'auth/strategy/guards';
import { talentDashboardService } from './dahsboard.service';
import {
  retrieveTalentMediaDto,
  retrieveTalentReportDto,
  selectMediaDayDto,
  supportHistoryDto,
} from './dto';

@UseGuards(JWTGuard)
@Controller('talent-dashboard')
export class talentDashboardController {
  constructor(private dashboardService: talentDashboardService) {}
  @Get('talent-media')
  retrieveTalentMedia(@Body() dto: retrieveTalentMediaDto) {
    return this.dashboardService.retrieveTalentMedia(dto);
  }
  @Get('talent-reports')
  retrieveTalentReports(@Body() dto: retrieveTalentReportDto) {
    return this.dashboardService.retrieveTalentReports(dto);
  }
  @Post('submit-verification-documents')
  submitVerificationDocuments() {
    return 'Submit verification documents';
  }
  @Post('select-media-day')
  selectMediaDay(@Body() dto: selectMediaDayDto) {
    return this.dashboardService.selectMediaDay(dto);
  }
  @Get('get-media-day')
  retrieveMediaDay(@Body() dto: retrieveTalentMediaDto) {
    return this.dashboardService.retrieveUpcomingMediaDays(dto);
  }
  @Get('past-support-history')
  retrievePastIssuesHistory(@Body() dto: supportHistoryDto) {
    return this.dashboardService.fetchAllTalentAssociatedSupportHistory(dto);
  }
}
