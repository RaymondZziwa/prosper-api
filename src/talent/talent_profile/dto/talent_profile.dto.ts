import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  talentId: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class GetTalentProfileDto {
  @IsNotEmpty()
  @IsString()
  talentId: string;
}

export class TalentProfileDto {
  profileImage: string;
  secondaryPosition: string;
  educationLevel: string;
  preferredFoot: string;
  govtDocumentImage: string;

  //incase of user-profile update --optional  fields
  oldPassword: string;
  newPassword: string;
}
