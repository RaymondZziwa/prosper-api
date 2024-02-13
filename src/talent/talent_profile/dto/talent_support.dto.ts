import { IsNotEmpty, IsString } from 'class-validator';

export class IssueSupportDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsString()
  reporterId: string;

  @IsString()
  @IsNotEmpty()
  issueTitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  solvedBy: string;
}
