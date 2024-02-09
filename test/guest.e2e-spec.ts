import { setup, teardown } from './test-setup';

describe('Guest profile E2E', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('Guest profile tests', () => {});
});
