import { Module } from '@nestjs/common';
import { SendEmailController } from './email.controller';
import { SendEmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
