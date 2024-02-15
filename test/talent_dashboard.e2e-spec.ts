import {
  retrieveTalentReportDto,
  selectMediaDayDto,
  supportHistoryDto,
} from 'talent/dashboard/dto';
import { setup, teardown } from './test-setup';
import * as pactum from 'pactum';
import { createAccessToken, getAccessToken } from './shared_resources';

describe('Talent dashboard tests', () => {
  beforeAll(async () => {
    await setup();
    await createAccessToken();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('talent dashboard tests', () => {
    //test to retrieve scheduled media days
    it('should retrieve all scheduled media days', () => {
      const dto: retrieveTalentReportDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent-dashboard/get-media-day')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(200);
    });
    //test to retrieve talent reports
    it('should retrieve talent reports', () => {
      const dto: retrieveTalentReportDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent-dashboard/talent-reports')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(200);
    });
    //test to retrieve talent media
    it('retrieve talent media', () => {
      const dto: retrieveTalentReportDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent-dashboard/talent-media')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(200);
    });
    //test to retrieve talent support history
    it('retrieve talent support history', () => {
      const dto: supportHistoryDto = {
        reporterId: '1',
      };
      return pactum
        .spec()
        .get('/talent-dashboard/past-support-history')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(200);
    });
    //test for talent selection of media day
    it('media day selection', () => {
      const dto: selectMediaDayDto = {
        talentId: '1',
        mediaDay: new Date('2024-02-18T12:00:00.000Z'),
      };
      return pactum
        .spec()
        .post('/talent-dashboard/select-media-day')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(201);
    });
  });
});
