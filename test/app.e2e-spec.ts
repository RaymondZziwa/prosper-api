import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignInDto, SignUpDto } from 'auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(1500);

    prisma = app.get(PrismaService);

    await prisma.cleanDatabase();
    pactum.request.setBaseUrl('http://localhost:1500');
  });
  afterAll(async () => {
    await app.close();
  });

  describe('talent auth', () => {
    //test for new talent registration
    describe('talent signup', () => {
      it('should create a talent account and the talent should receive an email once the account is created', () => {
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
          .expectStatus(201);
      });
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
        .expectStatus(400);
    });

    //test for cases of already registered phone numbers
    it('should fail if the primary phone number is already registered', () => {
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
        .expectStatus(400);
    });
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

  //test for registered talent login
  describe('talent login', () => {
    it('should login a talent with correct credentials and return an acess token', () => {
      const dto: SignInDto = {
        email: 'raymondzian@gmail.com',
        password: 'Testpassword12',
      };
      return pactum
        .spec()
        .post('/auth/talentlogin')
        .withBody(dto)
        .expectStatus(200);
    });
  });

  describe('retrieve talent profile', () => {
    describe('fetch talent profile', () => {});
  });

  describe('reset talent account password', () => {
    describe('reset password', () => {});
  });

  describe('talent account deactivation', () => {
    describe('deactivate talent account', () => {});
  });

  describe('talent submit issue for support', () => {
    describe('submitting of issue', () => {});
  });
});
