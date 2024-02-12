import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class saveNewPartnerDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export class saveNewEventDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  eventTitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  createdAt: Date;
  updatedAt: Date;
}

export class saveNewArticleDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
  updatedAt: Date;
}

export class saveNewSuccessStoryDto {
  @IsNotEmpty()
  @IsNumber()
  talentId: number;

  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
  updatedAt: Date;
}

export class managePartnersDto {
  @IsNotEmpty()
  @IsString()
  partnerId: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsString()
  name: string;
}

export class manageArticlesDto {
  @IsNotEmpty()
  @IsString()
  articleId: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class manageEventsDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsString()
  eventTitle: string;

  @IsString()
  description: string;

  @IsDateString()
  eventDate: Date;

  @IsString()
  location: string;
}

export class manageSuccessStoryDto {
  @IsNotEmpty()
  @IsString()
  storyId: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: Express.Multer.File;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
