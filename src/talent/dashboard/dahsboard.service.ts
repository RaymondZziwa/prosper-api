import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  retrieveTalentMediaDto,
  retrieveTalentReportDto,
  selectMediaDayDto,
  supportHistoryDto,
} from './dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable({})
export class talentDashboardService {
  constructor(private prisma: PrismaService) {}

  async fetchAllTalentAssociatedSupportHistory(dto: supportHistoryDto) {
    try {
      const history = await this.prisma.issues.findMany({
        where: { reporterId: parseInt(dto.reporterId) },
      });

      if (history) {
        return {
          HttpStatus: 200,
          history: history,
        };
      }

      return {
        HttpStatus: 404,
        message: 'There is no support history found.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while fetching your support history.',
        );
      }
    }
  }

  async selectMediaDay(dto: selectMediaDayDto) {
    try {
      await this.prisma.scheduledMediaDays.create({
        data: {
          talentId: parseInt(dto.talentId),
          scheduledDate: dto.mediaDay,
        },
      });

      return {
        HttpStatus: 201,
        message: 'You have successfully booked your media day',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while booking your media day.',
        );
      }
    }
  }

  async retrieveTalentMedia(dto: retrieveTalentMediaDto) {
    try {
      const media = await this.prisma.talentMedia.findMany({
        where: { talentId: parseInt(dto.talentId) },
      });

      if (media) {
        return {
          HttpStatus: 200,
          media: media,
        };
      }

      return {
        HttpStatus: 404,
        message: 'You have no media yet.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while retrieving your media.',
        );
      }
    }
  }

  async retrieveTalentReports(dto: retrieveTalentReportDto) {
    try {
      const reports = await this.prisma.talentReport.findMany({
        where: { talentId: parseInt(dto.talentId) },
      });

      if (reports) {
        return {
          HttpStatus: 200,
          reports: reports,
        };
      }

      return {
        HttpStatus: 404,
        message: 'You have no reports yet.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while retrieving your reports.',
        );
      }
    }
  }

  async retrieveUpcomingMediaDays(dto: retrieveTalentReportDto) {
    try {
      const schedule = await this.prisma.scheduledMediaDays.findMany({
        where: { talentId: parseInt(dto.talentId) },
      });

      if (schedule) {
        return {
          HttpStatus: 200,
          schedule: schedule,
        };
      }

      return {
        HttpStatus: 404,
        message: 'You have no upcoming media days.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while retrieving your scheduled media days.',
        );
      }
    }
  }
}
