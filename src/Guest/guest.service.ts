import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable({})
export class GuestService {
  constructor(private prisma: PrismaService) {}
  async getAllArticles() {
    try {
      const articles = await this.prisma.articles.findMany();
      if (articles.length === 0) {
        return {
          HttpStatus: 404,
          message: 'No articles found.',
        };
      }
      return articles;
    } catch (error) {
      throw new ForbiddenException('There were no articles found.');
    }
  }

  async getAllSuccessStories() {
    try {
      const stories = await this.prisma.successStories.findMany();
      if (stories.length === 0) {
        return {
          HttpStatus: 404,
          message: 'No success stories found.',
        };
      }
      return stories;
    } catch (error) {
      throw new ForbiddenException('There were no success stories found.');
    }
  }
  async getAllPartners() {
    try {
      const partners = await this.prisma.partners.findMany();
      if (partners.length === 0) {
        return {
          HttpStatus: 404,
          message: 'No partners found.',
        };
      }
      return partners;
    } catch (error) {
      throw new ForbiddenException('There were no partners found.');
    }
  }
  async getAllEvents() {
    try {
      const events = await this.prisma.events.findMany();
      if (events.length === 0) {
        return {
          HttpStatus: 404,
          message: 'No events found.',
        };
      }
      return events;
    } catch (error) {
      throw new ForbiddenException('There were no events found.');
    }
  }
}
