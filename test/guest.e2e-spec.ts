import { articles, events, partners, successStories } from '@prisma/client';
import { setup, teardown } from './test-setup';
import * as pactum from 'pactum';

describe('Guest profile E2E', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('Guest profile tests', () => {
    //test to retrieve all partners
    it('retrieve all partners', () => {
      return pactum
        .spec()
        .get('/home/get-all-partners')
        .expectStatus(200)
        .expectJson('partners', (partners: partners[]) => {
          expect(Array.isArray(partners)).toBe(true);
          expect(partners).toBeGreaterThan(0);
        });
    });
    it('should not retrieve the partners list as a result of the db being empty', () => {
      return pactum.spec().get('/home/get-all-partners').expectStatus(404);
    });
    //test to retrieve all events
    it('retrieve all events', () => {
      return pactum
        .spec()
        .get('/home/get-all-events')
        .expectStatus(200)
        .expectJson('events', (events: events[]) => {
          expect(Array.isArray(events)).toBe(true);
          expect(events).toBeGreaterThan(0);
        });
    });
    it('should not retrieve the events list as a result of the db being empty', () => {
      return pactum.spec().get('/home/get-all-events').expectStatus(404);
    });
    //test to retrieve all articles
    it('retrieve all articles', () => {
      return pactum
        .spec()
        .get('/home/get-all-articles')
        .expectStatus(200)
        .expectJson('articles', (articles: articles[]) => {
          expect(Array.isArray(articles)).toBe(true);
          expect(articles).toBeGreaterThan(0);
        });
    });
    it('should not retrieve the articles list as a result of the db being empty', () => {
      return pactum.spec().get('/home/get-all-articles').expectStatus(404);
    });
    //test to retrieve all success stories
    it('retrieve all success stories', () => {
      return pactum
        .spec()
        .get('/home/get-all-success-stories')
        .expectStatus(200)
        .expectJson('articles', (successStories: successStories[]) => {
          expect(Array.isArray(successStories)).toBe(true);
          expect(successStories).toBeGreaterThan(0);
        });
    });
    it('should not retrieve the success stories list as a result of the db being empty', () => {
      return pactum
        .spec()
        .get('/home/get-all-success-stories')
        .expectStatus(404);
    });
  });
});
