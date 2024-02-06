import { IsNotEmpty, IsString } from 'class-validator';

export class IssueSupport {
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
}
