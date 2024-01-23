import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('talentsignup')
  talentsignup(@Body() dto: SignUpDto) {
    return this.authService.talentsignup(dto);
  }

  @Post('talentlogin')
  talentlogin(@Body() dto: SignInDto) {
    return this.authService.talentlogin(dto);
  }
}
