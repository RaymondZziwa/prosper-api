import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getUserProfile() {
    return 'This is the user profile';
  }
}
