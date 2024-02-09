import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetTalentProfileDto, IssueSupportDto, ResetPasswordDto } from './dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  //reset talent account password
  async updateTalentAccountPassword(dto: ResetPasswordDto) {
    //find user talent by talentId
    const user = await this.prisma.talent.findUnique({
      where: {
        talentId: parseInt(dto.talentId),
      },
    });
    //compare user talent current password with entered old password
    if (user) {
      const comparePasswords = await argon.verify(
        user.password,
        dto.oldPassword,
      );

      if (!comparePasswords) {
        return {
          HttpStatus: 503,
          message:
            'The old password provided doesnot match your current password.',
        };
      }

      const hashedNewPassword = await argon.hash(dto.newPassword);
      try {
        await this.prisma.talent.update({
          where: { talentId: user.talentId },
          data: { password: hashedNewPassword },
        });

        return {
          HttpStatus: 200,
          message: 'Your password has been successfully updated.',
        };
      } catch (error) {
        return {
          HttpStatus: 503,
          message: 'Password reset failed. Please try again later.',
        };
      }
    }
  }
  //talent account deactivation
  async deactivateAccount(dto: GetTalentProfileDto) {
    const user = await this.prisma.talent.findUnique({
      where: { talentId: parseInt(dto.talentId) },
    });

    if (user) {
      await this.prisma.talent.update({
        where: { talentId: user.talentId },
        data: { accountActive: false },
      });

      return {
        HttpStatus: 200,
        message: 'Your account was successfully deactivated.',
      };
    }
  }
  //get talent profile
  async getTalentProfile(dto: GetTalentProfileDto) {
    const user = await this.prisma.talent.findUnique({
      where: { talentId: parseInt(dto.talentId) },
    });

    if (user) {
      return {
        talentId: user.talentId,
        firstName: user.firstName,
        lastName: user.lastName,
        nationality: user.nationality,
        dob: user.dob,
        profileImage: user.profileImage,
        primaryPosition: user.primaryPosition,
        secondaryPosition: user.secondaryPosition,
        isVerified: user.isVerified,
        category: user.category,
        preferredFoot: user.preferredFoot,
        talentEmail: user.email,
        phoneNumber: user.tel1,
        educationLevel: user.educationLevel,
      };
    }
  }
  //send a user issue/inquiry to support
  async createIssue(dto: IssueSupportDto) {
    try {
      const issue = await this.prisma.issues.create({
        data: {
          category: dto.category,
          title: dto.issueTitle,
          description: dto.description,
          reporterId: parseInt(dto.reporterId),
        },
      });

      return {
        HttpStatus: 201,
        message: 'Successfully sent your issue to our support team.',
        title: issue.title,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException(
          'Your issue was not sent to our support team. Please ensure you have filled in all the fields.',
        );
      }
      return {
        HttpStatus: 400,
        message:
          'There was an error while creating your issue. Please try again later.',
      };
    }
  }
}
