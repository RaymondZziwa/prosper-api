import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  manageArticlesDto,
  manageEventsDto,
  managePartnersDto,
  manageSuccessStoryDto,
  saveNewArticleDto,
  saveNewEventDto,
  saveNewPartnerDto,
  saveNewSuccessStoryDto,
} from './dto/support.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable({})
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async savePartners(dto: saveNewPartnerDto) {
    try {
      await this.prisma.partners.create({
        data: {
          thumbnail: dto.thumbnail,
          name: dto.name,
        },
      });

      return {
        HttpStatus: 201,
        message: `Successfully added ${dto.name} to our partners list.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Error while updating our partners list');
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while saving the new partner. Please try again later.',
      };
    }
  }

  async deletePartners(dto: managePartnersDto) {
    try {
      await this.prisma.partners.delete({
        where: { partnerId: parseInt(dto.partnerId) },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully deleted partner.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while deleting the selected partner.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while deleting the selected partner. Please try again later.',
      };
    }
  }

  async saveNewEvent(dto: saveNewEventDto) {
    try {
      await this.prisma.events.create({
        data: {
          thumbnail: dto.thumbnail,
          eventTitle: dto.eventTitle,
          description: dto.description,
          eventDate: dto.eventDate,
          location: dto.location,
        },
      });

      return {
        HttpStatus: 201,
        message: `Successfully added ${dto.eventTitle} to our events list.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Error while updating our events list.');
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while saving the new event. Please try again later.',
      };
    }
  }
  async editEvent(dto: manageEventsDto) {}
  async deleteEvent(dto: manageEventsDto) {
    try {
      await this.prisma.events.delete({
        where: { eventId: parseInt(dto.eventId) },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully deleted the event.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while deleting the selected event.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while deleting the selected event. Please try again later.',
      };
    }
  }

  async saveNewArticle(dto: saveNewArticleDto) {
    try {
      await this.prisma.articles.create({
        data: {
          thumbnail: dto.thumbnail,
          title: dto.title,
          content: dto.content,
        },
      });

      return {
        HttpStatus: 201,
        message: `Article successfully saved.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Error while saving article.');
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while saving the new article. Please try again later.',
      };
    }
  }
  async editArticle(dto: manageArticlesDto) {}
  async deleteArticle(dto: manageArticlesDto) {
    try {
      await this.prisma.articles.delete({
        where: { articleId: parseInt(dto.articleId) },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully deleted article.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while deleting the selected article.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while deleting the selected article. Please try again later.',
      };
    }
  }

  async saveNewSuccessStory(dto: saveNewSuccessStoryDto) {
    try {
      await this.prisma.successStories.create({
        data: {
          thumbnail: dto.thumbnail,
          title: dto.title,
          content: dto.content,
        },
      });

      return {
        HttpStatus: 201,
        message: `Successfully added ${dto.title} to our success stories list.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'Error while updating our success stories list.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while saving the new success stories. Please try again later.',
      };
    }
  }
  async editSuccessStory(dto: manageSuccessStoryDto) {}
  async deleteSuccessStory(dto: manageSuccessStoryDto) {
    try {
      await this.prisma.successStories.delete({
        where: { storyId: parseInt(dto.storyId) },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully deleted the story.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while deleting the selected story.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while deleting the selected story. Please try again later.',
      };
    }
  }
}
