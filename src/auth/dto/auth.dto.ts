import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  tel1: string;

  tel2: string;

  @IsString()
  @IsNotEmpty()
  nok_firstName: string;

  @IsString()
  @IsNotEmpty()
  nok_lastName: string;

  @IsString()
  @IsNotEmpty()
  nok_relationship: string;

  @IsString()
  @IsNotEmpty()
  nok_tel1: string;

  nok_tel2: string;

  @IsEmail()
  @IsNotEmpty()
  nok_email: string;

  profileImage: string;

  @IsString()
  @IsNotEmpty()
  primaryPosition: string;

  @IsString()
  @IsNotEmpty()
  secondaryPosition: string;

  @IsString()
  @IsNotEmpty()
  educationLevel: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  preferredFoot: string;

  registeredAt: Date;
  updatedAt: Date;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  password: string;
}

export class requestPasswordResetEncryptionKeyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class resetTalentAccountPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  encryptionKey: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'New password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  newPassword: string;
}
