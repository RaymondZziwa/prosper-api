import { setup, teardown } from './test-setup';
import * as pactum from 'pactum';
import {
  GetTalentProfileDto,
  IssueSupportDto,
  ResetPasswordDto,
} from 'talent/talent_profile/dto';
import { createAccessToken, getAccessToken } from './shared_resources';

describe('Talent profile E2E', () => {
  beforeAll(async () => {
    await setup();
    await createAccessToken();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('talent profile tests', () => {
    //test to retrieve talent account information with no access token
    it('should not retrieve talent profile since no token is provided', () => {
      const dto: GetTalentProfileDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent/profile')
        .withBody(dto)
        .expectStatus(401);
    });
    //test to retrieve talent account information with invalid token
    it('should not retrieve talent profile due to invalid token', () => {
      const dto: GetTalentProfileDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent/talent-profile')
        .withBearerToken('46t9yrvbebgehrbt94tg48bg4.5tg4g5jvnefiv.23f2rvaSCWQ')
        .withBody(dto)
        .expectStatus(401);
    });
    //test to retrieve talent account information
    it('retrieve talent profile', () => {
      const dto: GetTalentProfileDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .get('/talent/talent-profile')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(200);
    });
    //test for talent account password update
    it('updates password', () => {
      const dto: ResetPasswordDto = {
        talentId: '1',
        oldPassword: 'Testpassword12',
        newPassword: 'newtestpassword123',
      };
      return pactum
        .spec()
        .post('/talent/update-password')
        .withBody(dto)
        .withBearerToken(getAccessToken())
        .expectStatus(201);
    });
    //test for talent account deactivation
    it('deactivates talent account', () => {
      const dto: GetTalentProfileDto = {
        talentId: '1',
      };
      return pactum
        .spec()
        .post('/talent/deactivate-account')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(201);
    });

    //test for talent issue submission
    it('submits user support issues', () => {
      const dto: IssueSupportDto = {
        issueTitle: 'test issue title 2',
        description: 'test description xoxoxoxo 2',
        category: 'talent',
        reporterId: '1',
      };
      return pactum
        .spec()
        .post('/talent/talent-support')
        .withBearerToken(getAccessToken())
        .withBody(dto)
        .expectStatus(201);
    });
  });
});
