import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  manageIssueSupportDto,
  getSupportPersonnelProfileDto,
  manageArticlesDto,
  manageEventsDto,
  managePartnersDto,
  manageSuccessStoryDto,
  saveNewArticleDto,
  saveNewEventDto,
  saveNewPartnerDto,
  saveNewSuccessStoryDto,
  manageTalentInquiries,
} from './dto/support.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { FileService } from 'config/multer.service';

@Injectable({})
export class SupportService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}
  //get support team personnel profile
  async getSupportTeamPersonnelProfile(dto: getSupportPersonnelProfileDto) {
    try {
      const user = await this.prisma.supportTeam.findUnique({
        where: { Id: parseInt(dto.Id) },
      });

      if (user) {
        return {
          Id: user.Id,
          firstName: user.firstName,
          lastName: user.lastName,
          nationality: user.nationality,
          profileImage: user.profileImage,
          email: user.email,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching your profile.',
        );
      }
    }
  }
  //get all talents
  async getAllTalents() {
    try {
      const talents = await this.prisma.talent.findMany();

      if (talents) {
        return {
          HttpStatus: 200,
          talents: talents,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of talents.',
        );
      }
    }
  }
  //get all scouts
  async getAllScouts() {
    try {
      const scouts = await this.prisma.scout.findMany();

      if (scouts) {
        return {
          HttpStatus: 200,
          scouts: scouts,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of scouts.',
        );
      }
    }
  }
  //get all partners
  async getAllPartners() {
    try {
      const partners = await this.prisma.partners.findMany();

      if (partners) {
        return {
          HttpStatus: 200,
          partners: partners,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of partners.',
        );
      }
    }
  }
  //partner creation function
  async saveNewPartner(dto: saveNewPartnerDto) {
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
  async deletePartner(dto: managePartnersDto) {
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

  //get all events
  async getAllEvents() {
    try {
      const events = await this.prisma.events.findMany();

      if (events) {
        return {
          HttpStatus: 200,
          events: events,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of events.',
        );
      }
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
  //get all articles
  async getAllArticles() {
    try {
      const articles = await this.prisma.articles.findMany();

      if (articles) {
        return {
          HttpStatus: 200,
          articles: articles,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of articles.',
        );
      }
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
  //get all success stories
  async getAllSuccessStories() {
    try {
      const successStories = await this.prisma.successStories.findMany();

      if (successStories) {
        return {
          HttpStatus: 200,
          successStories: successStories,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of successStories.',
        );
      }
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
  //get all issues
  async getAllSubmittedIssues() {
    try {
      const issues = await this.prisma.issues.findMany();

      if (issues) {
        return {
          HttpStatus: 200,
          issues: issues,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of issues.',
        );
      }
    }
  }
  //respond to submitted pending issues
  async respondToIssue(dto: manageIssueSupportDto) {
    try {
      const issue = await this.prisma.issues.findUnique({
        where: { issueId: parseInt(dto.issueId) },
      });

      if (issue) {
        try {
          await this.prisma.issues.update({
            where: { issueId: issue.issueId },
            data: {
              supportResponse: dto.supportResponse,
              solvedBy: parseInt(dto.solvedBy),
            },
          });
          return {
            HttpStatus: 200,
            message: `Successfully responded to the  issue with id ${issue.title}.`,
          };
        } catch (error) {
          if (error instanceof PrismaClientValidationError) {
            throw new ForbiddenException(
              `Error while responding to the issue titled ${issue.title}.`,
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'The issue you are trying to respond to was not found.',
        );
      }
    }
  }
  //get all talent inquiries
  async getAllTalentInquiries() {
    try {
      const inquiries = await this.prisma.talentInquiries.findMany();

      if (inquiries) {
        return {
          HttpStatus: 200,
          issues: inquiries,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'An error was encountered while fetching the list of talent inquiries.',
        );
      }
    }
  }
  //respond to submitted pending talent inquiries
  async respondToTalentInquiry(dto: manageTalentInquiries) {
    try {
      const inquiry = await this.prisma.talentInquiries.findUnique({
        where: { inquiryId: parseInt(dto.inquiryId) },
      });

      if (inquiry) {
        try {
          await this.prisma.talentInquiries.update({
            where: { inquiryId: inquiry.inquiryId },
            data: {
              inquiryResponse: dto.inquiryResponse,
              isRespondedTo: true,
            },
          });
          return {
            HttpStatus: 200,
            message: `Successfully responded to the  inquiry with id ${inquiry.inquiryId}.`,
          };
        } catch (error) {
          if (error instanceof PrismaClientValidationError) {
            throw new ForbiddenException(
              `Error while responding to the inquiry with id ${inquiry.inquiryId}.`,
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'The inquiry you want to respond to was not found.',
        );
      }
    }
  }
}
