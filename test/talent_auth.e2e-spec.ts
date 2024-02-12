import * as pactum from 'pactum';
import { setup, teardown } from './test-setup';
import {
  SignInDto,
  SignUpDto,
  requestPasswordResetEncryptionKeyDto,
  resetTalentAccountPasswordDto,
} from 'auth/dto';
import {
  setAccessToken,
  setEncryptionKey,
  getEncryptionKey,
} from './shared_resources';
import { generatePasswordResetEncryptionKey } from 'encryption_key_generation';

describe('Application Auth E2E', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('talent auth', () => {
    //talent registration tests
    //test for new talent registration
    it('should create a talent account and the talent should receive an email once the account is created', async () => {
      const dto: SignUpDto = {
        firstName: 'Zziwa',
        lastName: 'Raymond',
        nationality: 'Ugandan',
        email: 'raymondzian@gmail.com',
        tel1: '0775563805',
        tel2: '0775149572',
        nok_firstName: 'mukiibi',
        nok_lastName: 'reagan',
        nok_relationship: 'brother',
        nok_tel1: '0202',
        nok_tel2: '0101',
        nok_email: 'test@gmail.com',
        profileImage: 'testimage',
        primaryPosition: 'Forward',
        secondaryPosition: 'Midfielder',
        educationLevel: 'College',
        category: 'U-17',
        password: 'Testpassword12',
        preferredFoot: 'right',
        dob: new Date('2001-07-02T12:00:00.000Z'),
        registeredAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      const response = await pactum
        .spec()
        .post('/auth/talentsignup')
        .withBody(dto)
        .expectStatus(201);
      //save access token
      setAccessToken(response.body.access_token);
    });

    //test for cases of already registered email addresses
    it('should fail if the email is already registered', () => {
      const dto: SignUpDto = {
        firstName: 'Zziwa',
        lastName: 'Raymond',
        nationality: 'Ugandan',
        email: 'raymondzian@gmail.com',
        tel1: '0775563805',
        tel2: '0775149572',
        nok_firstName: 'mukiibi',
        nok_lastName: 'reagan',
        nok_relationship: 'brother',
        nok_tel1: '0202',
        nok_tel2: '0101',
        nok_email: 'test@gmail.com',
        profileImage: 'testimage',
        primaryPosition: 'Forward',
        secondaryPosition: 'Midfielder',
        educationLevel: 'College',
        category: 'U-17',
        password: 'Testpassword12',
        preferredFoot: 'right',
        dob: new Date('2001-07-02T12:00:00.000Z'),
        registeredAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      return pactum
        .spec()
        .post('/auth/talentsignup')
        .withBody(dto)
        .expectStatus(403);
    });

    //test for cases of already registered phone numbers
    it('should fail if the primary phone number is already registered', () => {
      const dto: SignUpDto = {
        firstName: 'Zziwa',
        lastName: 'Raymond',
        nationality: 'Ugandan',
        email: 'rymondzian@gmail.com',
        tel1: '0775563805',
        tel2: '0775149572',
        nok_firstName: 'mukiibi',
        nok_lastName: 'reagan',
        nok_relationship: 'brother',
        nok_tel1: '0202',
        nok_tel2: '0101',
        nok_email: 'test@gmail.com',
        profileImage: 'testimage',
        primaryPosition: 'Forward',
        secondaryPosition: 'Midfielder',
        educationLevel: 'College',
        category: 'U-17',
        password: 'Testpassword12',
        preferredFoot: 'right',
        dob: new Date('2001-07-02T12:00:00.000Z'),
        registeredAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      return pactum
        .spec()
        .post('/auth/talentsignup')
        .withBody(dto)
        .expectStatus(403);
    });

    //test for cases of incomplete registration fields
    it('should fail if any of the priority fields is empty', () => {
      const dto: SignUpDto = {
        firstName: 'Zziwa',
        lastName: 'Raymond',
        nationality: '',
        email: 'raymondzian@gmail.com',
        tel1: '0775563805',
        tel2: '0775149572',
        nok_firstName: '',
        nok_lastName: 'reagan',
        nok_relationship: '',
        nok_tel1: '0202',
        nok_tel2: '0101',
        nok_email: '',
        profileImage: 'testimage',
        primaryPosition: '',
        secondaryPosition: 'Midfielder',
        educationLevel: 'College',
        category: 'U-17',
        password: 'Testpassword12',
        preferredFoot: 'right',
        dob: new Date('2001-07-02T12:00:00.000Z'),
        registeredAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      return pactum
        .spec()
        .post('/auth/talentsignup')
        .withBody(dto)
        .expectStatus(400);
    });

    //talent login tests
    //test for cases of empty fields
    it('should fail as a result of empty fields', () => {
      const dto: SignInDto = {
        email: '',
        password: 'Testpassword12',
      };
      return pactum
        .spec()
        .post('/auth/talentlogin')
        .withBody(dto)
        .expectStatus(400);
    });
    //test for wrong email address
    it('should fail as a result of trying to log in with a wrong email address', () => {
      const dto: SignInDto = {
        email: 'zazraymondzian@gmail.com',
        password: 'Testpassword12',
      };
      return pactum
        .spec()
        .post('/auth/talentlogin')
        .withBody(dto)
        .expectStatus(403);
    });
    //test for wrong password
    it('should fail as a result of trying to log in with a wrong password', () => {
      const dto: SignInDto = {
        email: 'raymondzian@gmail.com',
        password: 'Testpassword12345',
      };
      return pactum
        .spec()
        .post('/auth/talentlogin')
        .withBody(dto)
        .expectStatus(403);
    });

    //test for sign in attempt with no body
    it('should fail as a result of trying to log in with an empty body', () => {
      return pactum.spec().post('/auth/talentlogin').expectStatus(400);
    });

    //test for registered talent login
    it('should login a talent with correct credentials and return an acess token', async () => {
      const dto: SignInDto = {
        email: 'raymondzian@gmail.com',
        password: 'Testpassword12',
      };
      const response = await pactum
        .spec()
        .post('/auth/talentlogin')
        .withBody(dto)
        .expectStatus(201);
      //save access token
      setAccessToken(response.body.access_token);
    });
    //test for verifying user requesting for talent account password reset
    it('should send an email to the user containing an encryption key', async () => {
      const dto: requestPasswordResetEncryptionKeyDto = {
        email: 'raymondzian@gmail.com',
      };
      await pactum
        .spec()
        .post('/auth/talent-verify-user')
        .withBody(dto)
        .expectStatus(201);
      //save encryption key
      setEncryptionKey(generatePasswordResetEncryptionKey().key);
    });
    //test for denying the user to reset password incase of an invalid encryption key
    it('should deny the user password reset due to invalid encryption key', async () => {
      const dto: resetTalentAccountPasswordDto = {
        email: 'raymondzian@gmail.com',
        encryptionKey: 'vijr425',
        newPassword: 'NewTestpass123!',
      };
      await pactum
        .spec()
        .post('/auth/talent-reset-password')
        .withBody(dto)
        .expectStatus(403);
    });
    //test for testing talent account password reset
    it('should reset the talent account password', async () => {
      const dto: resetTalentAccountPasswordDto = {
        email: 'raymondzian@gmail.com',
        encryptionKey: getEncryptionKey(),
        newPassword: 'NewTestpass123!',
      };
      await pactum
        .spec()
        .post('/auth/talent-reset-password')
        .withBody(dto)
        .expectStatus(201);
    });
  });
});
