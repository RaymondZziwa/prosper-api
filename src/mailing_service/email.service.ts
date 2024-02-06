import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { env } from 'process';

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
    const mailOptions = {
      from: 'noreply@prosperfootballagency.com',
      to,
      subject: 'WELCOME TO PROSPER FOOTBALL AGENCY.',
      text: `
      Dear ${firstName} ${lastName},
      
      We're excited to have you join our platform dedicated to showcasing and connecting talented football players like yourself. Whether you're a seasoned athlete or just starting your football journey, we believe your unique skills and passion for the game will shine on our platform.
      
      Here's how you can kick off your experience:
      
      ▶ Complete Your Football Profile:
         Ensure your football profile is complete with all the relevant details – your playing position, skills, achievements, and more. This will help you stand out and attract the right opportunities.
      
      ▶ Explore Football Opportunities:
         Dive into the platform and explore the diverse range of football opportunities available. From scouting events to club trials, our platform offers tailored opportunities that match your football skills and interests.
      
      ▶ Stay Informed about Football Events:
         Keep an eye on our newsletters and announcements to stay updated on the latest football events, trials, and opportunities within the Prosper Football Agency community.
      
      If you have any questions or need assistance, our support team is here to help. Feel free to reach out to [support@prosperfootballagency.com].
      
      Once again, welcome aboard! We can't wait to see your skills in action on our platform.
      
      Best regards,
      
      Zziwa Raymond Ian
      Co-founder
      Prosper Football Agency
      
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(to: string, firstName: string, lastName: string) {
    const mailOptions = {
      from: env.SMTP_USER,
      to,
      subject: 'VERIFY YOUR EMAIL.',
      text: `
      Dear ${firstName} ${lastName},    
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
