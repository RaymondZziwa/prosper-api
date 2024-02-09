import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { SendEmailService } from 'mailing_service/email.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private sendEmail: SendEmailService,
  ) {}
  //talent sign up
  async talentsignup(dto: SignUpDto) {
    //logic to hash the incoming password
    const hashedPassword = await argon.hash(dto.password);
    //logic to save the user information in the database
    try {
      const talent = await this.prisma.talent.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          nationality: dto.nationality,
          dob: dto.dob,
          email: dto.email,
          tel1: dto.tel1,
          tel2: dto.tel2,
          nok_firstName: dto.nok_firstName,
          nok_lastName: dto.nok_lastName,
          nok_relationship: dto.nok_relationship,
          nok_tel1: dto.nok_tel1,
          nok_tel2: dto.nok_tel2,
          nok_email: dto.nok_email,
          profileImage: dto.profileImage,
          primaryPosition: dto.primaryPosition,
          secondaryPosition: dto.secondaryPosition,
          educationLevel: dto.educationLevel,
          category: dto.category,
          password: hashedPassword,
          preferredFoot: dto.preferredFoot,
        },
      });

      //logic to send welcome email and return the new user
      try {
        await this.sendEmail.sendWelcomeEmail(
          dto.email,
          dto.firstName,
          dto.lastName,
        );
      } catch (error) {
        console.log(error);
      }
      return this.signToken(talent.talentId, talent.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'The email or phone number you are trying to use is already associated to an account.Please use a different email.',
          );
        }
      }

      throw error;
    }
  }
  //talent log in
  async talentlogin(dto: SignInDto) {
    //find user by email
    const user = await this.prisma.talent.findUnique({
      where: {
        email: dto.email,
        accountActive: true,
      },
    });
    //throw exception if user doesnot exist
    if (!user) {
      throw new ForbiddenException('User account was not found.');
    }
    //compare passwords
    const comparePasswords = await argon.verify(user.password, dto.password);
    //throw exception if passwords do not match
    if (!comparePasswords) {
      throw new ForbiddenException('Incorrect password.');
    }
    //log in the user if all details match
    return this.signToken(user.talentId, user.email);
  }

  //function to sign data into the encrypted access token
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const signaturePayload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(signaturePayload, {
      expiresIn: '5h',
      secret: env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
