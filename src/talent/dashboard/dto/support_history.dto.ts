import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class supportHistoryDto {
  @IsString()
  @IsNotEmpty()
  reporterId: string;
}

export class retrieveTalentMediaDto {
  @IsString()
  @IsNotEmpty()
  talentId: string;
}

export class retrieveTalentReportDto {
  @IsString()
  @IsNotEmpty()
  talentId: string;
}

export class selectMediaDayDto {
  @IsString()
  @IsNotEmpty()
  talentId: string;
  @IsString()
  @IsDateString()
  mediaDay: Date;
}
