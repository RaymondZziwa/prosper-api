import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class saveNewPartnerDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export class saveNewEventDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

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
  thumbnail: string;

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
  @IsString()
  thumbnail: string;

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

  @IsString()
  thumbnail: string;

  @IsString()
  name: string;
}

export class manageArticlesDto {
  @IsNotEmpty()
  @IsString()
  articleId: string;

  @IsString()
  thumbnail: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class manageEventsDto {
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

  @IsString()
  thumbnail: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
