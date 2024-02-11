import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'app.module';
import { PrismaService } from 'prisma/prisma.service';
import * as pactum from 'pactum';

let app: INestApplication;
let prisma: PrismaService;

export const setup = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(1500);

  prisma = app.get(PrismaService);

  await prisma.cleanDatabase();
  pactum.request.setBaseUrl('http://localhost:1500');
  return { app, prisma };
};

export const teardown = async () => {
  await app.close();

  await new Promise((resolve) => setTimeout(resolve, 1000));
};
