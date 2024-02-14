import { Module } from '@nestjs/common';
import { talentDashboardController } from './dashboard.controller';
import { talentDashboardService } from './dahsboard.service';

@Module({
  controllers: [talentDashboardController],
  providers: [talentDashboardService],
})
export class TalentDashboardModule {}
