import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { env } from 'process';
import {
  emailVerificationTemplate,
  passwordResetEmailTemplate,
  welcomeEmailTemplate,
} from './email_templates';

@Injectable()
export class SendEmailService {
  private readonly transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        ciphers:
          'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256',
      },
      authMethod: 'PLAIN',
    });
  }

  async sendWelcomeEmail(to: string, firstName: string, lastName: string) {
    const emailTemplate: string = await welcomeEmailTemplate(
      firstName,
      lastName,
    );
    const mailOptions = {
      from: 'noreply@prosperfootballagency.com',
      to,
      subject: 'WELCOME TO PROSPER FOOTBALL AGENCY.',
      text: emailTemplate,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(
    to: string,
    firstName: string,
    lastName: string,
    verificationKey: string,
  ) {
    const emailTemplate: string = await emailVerificationTemplate(
      firstName,
      lastName,
      verificationKey,
    );
    const mailOptions = {
      from: env.SMTP_USER,
      to,
      subject: 'VERIFY YOUR EMAIL.',
      text: emailTemplate,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(
    to: string,
    firstName: string,
    lastName: string,
    encryptionKey: string,
  ) {
    const emailTemplate: string = await passwordResetEmailTemplate(
      firstName,
      lastName,
      encryptionKey,
    );
    const mailOptions = {
      from: env.SMTP_USER,
      to,
      subject: 'TALENT ACCOUNT PASSWORD RESET.',
      text: emailTemplate,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
