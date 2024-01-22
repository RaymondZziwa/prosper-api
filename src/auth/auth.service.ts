import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return 'You have signed up.';
  }

  login() {
    return 'You have logged in.';
  }
}
