import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }

  cleanDatabase() {
    return this.$transaction([
      this.issues.deleteMany(),
      this.talentMedia.deleteMany(),
      this.events.deleteMany(),
      this.talentReport.deleteMany(),
      this.talent.deleteMany(),
      this.scout.deleteMany(),
    ]);
  }
}
