import { Controller } from '@nestjs/common';
import { SendEmailService } from './email.service';

@Controller('sendemail')
export class SendEmailController {
  constructor(private emailService: SendEmailService) {}
}
