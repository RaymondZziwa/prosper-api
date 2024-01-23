/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
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
      //logic to return the new user
      return "Registration successful. Please log in to access your dashboard.";
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'The email you are trying to use is already associated to an account.Please use a different email.',
          );
        }
      }

      throw error;
    }
  }

  async talentlogin(dto: SignInDto) {
    //find user by email
    const user = await this.prisma.talent.findUnique({
      where: { 
        email: dto.email,
      },
    });
    //throw exception if user doesnot exist
    if (!user) {
      throw new ForbiddenException('User account not found.');
    }
    //compare passwords
    const comparePasswords = await argon.verify(user.password, dto.password);
    //throw exception if passwords do not match
    if (!comparePasswords) {
      throw new ForbiddenException('Incorrect password.');
    }
    //log in the user if all details match
    return user;
  }
}
