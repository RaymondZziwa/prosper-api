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
import { FileService } from 'config/multer.service';

@Injectable({})
export class SupportService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}
  //partner creation function
  async savePartners(dto: saveNewPartnerDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'partners_thumbnails',
      );
      await this.prisma.partners.create({
        data: {
          thumbnail: savedImagePath,
          name: dto.name,
        },
      });

      return {
        HttpStatus: 201,
        message: `Successfully added ${dto.name} to our partners list.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          `Error while adding ${dto.name} to our partners list.`,
        );
      }
      return {
        HttpStatus: 400,
        message: `There was an error while saving ${dto.name}. Please try again later.`,
      };
    }
  }

  //partner deletion function
  async deletePartners(dto: managePartnersDto) {
    try {
      await this.prisma.partners.delete({
        where: { partnerId: parseInt(dto.partnerId) },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully deleted the selected partner.',
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'There was an error while deleting the selected partner.',
        );
      }
      return {
        HttpStatus: 404,
        message:
          'Partner you are trying to delete was not found. Please try again later.',
      };
    }
  }

  //event creation function
  async saveNewEvent(dto: saveNewEventDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'events_thumbnails',
      );
      await this.prisma.events.create({
        data: {
          thumbnail: savedImagePath,
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
        throw new ForbiddenException(
          `Error while adding ${dto.eventTitle} to our events list.`,
        );
      }
      return {
        HttpStatus: 400,
        message: `There was an error while saving the new event titled ${dto.eventTitle}. Please try again later.`,
      };
    }
  }

  //event editing function
  async editEvent(dto: manageEventsDto) {
    try {
      const event = await this.prisma.events.findUnique({
        where: {
          eventId: parseInt(dto.eventId),
        },
      });
      if (event) {
        try {
          const savedImagePath = await this.fileService.saveFile(
            dto.thumbnail,
            'events_thumbnails',
          );
          await this.prisma.events.update({
            where: { eventId: parseInt(dto.eventId) },
            data: {
              thumbnail: savedImagePath,
              eventTitle: dto.eventTitle,
              description: dto.description,
              eventDate: dto.eventDate,
              location: dto.location,
            },
          });
          return {
            HttpStatus: 200,
            message: `Successfully updated the event titled ${dto.eventTitle}.`,
          };
        } catch (error) {
          if (error instanceof PrismaClientValidationError) {
            throw new ForbiddenException(
              `Error while editing the event titled ${dto.eventTitle}.`,
            );
          }
        }
      }
    } catch (error) {
      return {
        HttpStatus: 404,
        message: `The event you are trying to edit was not found. Please try again later.`,
      };
    }
  }
  //event deletion function
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
          'There event you are trying to delete was not found. Please try again later.',
      };
    }
  }
  //article creation function
  async saveNewArticle(dto: saveNewArticleDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'articles_thumbnails',
      );
      await this.prisma.articles.create({
        data: {
          thumbnail: savedImagePath,
          title: dto.title,
          content: dto.content,
        },
      });

      return {
        HttpStatus: 201,
        message: `Successfully added article titled ${dto.title} to our articles list.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          `Error while saving article titled ${dto.title}.`,
        );
      }
      return {
        HttpStatus: 400,
        message: `There was an error while saving the new article titled ${dto.title}. Please try again later.`,
      };
    }
  }

  //article editing function
  async editArticle(dto: manageArticlesDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'articles_thumbnails',
      );
      const article = await this.prisma.articles.findUnique({
        where: {
          articleId: parseInt(dto.articleId),
        },
      });
      if (article) {
        try {
          await this.prisma.articles.update({
            where: { articleId: parseInt(dto.articleId) },
            data: {
              thumbnail: savedImagePath,
              title: dto.title,
              content: dto.content,
            },
          });
          return {
            HttpStatus: 200,
            message: `Successfully updated the article titled ${dto.title}.`,
          };
        } catch (error) {
          if (error instanceof PrismaClientValidationError) {
            throw new ForbiddenException(
              `Error while editing the article titled ${dto.title}.`,
            );
          }
        }
      }
    } catch (error) {
      return {
        HttpStatus: 404,
        message: `The article you are trying to edit was not found. Please try again later.`,
      };
    }
  }

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
        HttpStatus: 404,
        message:
          'There article you are trying to delete was not. Please try again later.',
      };
    }
  }

  //success story creation function
  async saveNewSuccessStory(dto: saveNewSuccessStoryDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'success_stories_thumbnails',
      );
      await this.prisma.successStories.create({
        data: {
          talentId: dto.talentId,
          thumbnail: savedImagePath,
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

  //success story editing function
  async editSuccessStory(dto: manageSuccessStoryDto) {
    try {
      const savedImagePath = await this.fileService.saveFile(
        dto.thumbnail,
        'success_stories_thumbnails',
      );
      const story = await this.prisma.successStories.findUnique({
        where: {
          storyId: parseInt(dto.storyId),
        },
      });
      if (story) {
        try {
          await this.prisma.successStories.update({
            where: { storyId: parseInt(dto.storyId) },
            data: {
              thumbnail: savedImagePath,
              title: dto.title,
              content: dto.content,
            },
          });
          return {
            HttpStatus: 200,
            message: `Successfully updated the success story titled ${dto.title}.`,
          };
        } catch (error) {
          if (error instanceof PrismaClientValidationError) {
            throw new ForbiddenException(
              `Error while editing the success story titled ${dto.title}.`,
            );
          }
        }
      }
    } catch (error) {
      return {
        HttpStatus: 404,
        message: `The success story you are trying to edit was not found. Please try again later.`,
      };
    }
  }

  //success story deletion function
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
